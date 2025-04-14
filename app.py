from flask import Flask, render_template, request, jsonify
import os
import pandas as pd
import json
from datetime import datetime
import sys

# Thêm đường dẫn để import các module khác
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from src.config import PORT, HOST, STATIC_DIR, TEMPLATES_DIR, VN30_SYMBOLS
from src.data_collector import collect_all_vn30_data, get_stock_data_from_yahoo
from src.sentiment_analyzer import analyze_news_data, get_stock_sentiment_summary, analyze_market_sentiment

app = Flask(__name__, 
            static_folder=STATIC_DIR,
            template_folder=TEMPLATES_DIR)

# Đường dẫn lưu trữ dữ liệu
DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

@app.route('/')
def index():
    """Trang chủ"""
    # Lấy dữ liệu sentiment thị trường
    market_sentiment = analyze_market_sentiment()
    
    # Lấy danh sách cổ phiếu có sentiment tốt nhất và kém nhất
    if market_sentiment and 'stock_sentiments' in market_sentiment:
        best_stocks = market_sentiment['stock_sentiments'][:5]  # 5 cổ phiếu tốt nhất
        worst_stocks = market_sentiment['stock_sentiments'][-5:]  # 5 cổ phiếu kém nhất
        worst_stocks.reverse()  # Đảo ngược để hiển thị từ kém nhất đến ít kém nhất
    else:
        best_stocks = []
        worst_stocks = []
    
    # Lấy dữ liệu lịch sử cho VN-Index
    try:
        vnindex_data = get_stock_data_from_yahoo("^VNINDEX", range="1mo")
        if vnindex_data:
            # Xử lý dữ liệu để vẽ biểu đồ
            result = vnindex_data.get('chart', {}).get('result', [])
            if result and len(result) > 0:
                timestamps = result[0].get('timestamp', [])
                indicators = result[0].get('indicators', {})
                quotes = indicators.get('quote', [])
                
                if quotes and len(quotes) > 0:
                    quote_data = quotes[0]
                    
                    # Tạo dữ liệu cho biểu đồ
                    chart_data = []
                    for i in range(len(timestamps)):
                        if i < len(quote_data.get('close', [])) and quote_data['close'][i] is not None:
                            chart_data.append({
                                'date': datetime.fromtimestamp(timestamps[i]).strftime('%Y-%m-%d'),
                                'close': quote_data['close'][i]
                            })
                    
                    # Chuyển thành JSON để sử dụng trong JavaScript
                    vnindex_chart_data = json.dumps(chart_data)
                else:
                    vnindex_chart_data = "[]"
            else:
                vnindex_chart_data = "[]"
        else:
            vnindex_chart_data = "[]"
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu VN-Index: {str(e)}")
        vnindex_chart_data = "[]"
    
    return render_template('index.html', 
                          market_sentiment=market_sentiment,
                          best_stocks=best_stocks,
                          worst_stocks=worst_stocks,
                          vnindex_chart_data=vnindex_chart_data)

@app.route('/stocks')
def stocks():
    """Trang danh sách cổ phiếu"""
    # Đọc dữ liệu công ty
    company_file = os.path.join(DATA_DIR, 'sample_company_info.csv')
    if os.path.exists(company_file):
        company_df = pd.read_csv(company_file)
    else:
        company_df = pd.DataFrame(columns=['symbol', 'name', 'industry'])
    
    # Đọc dữ liệu sentiment
    sentiment_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    if os.path.exists(sentiment_file):
        sentiment_df = pd.read_csv(sentiment_file)
        
        # Tính sentiment cho từng cổ phiếu
        stock_sentiments = {}
        for symbol in sentiment_df['symbol'].unique():
            summary = get_stock_sentiment_summary(symbol)
            if summary:
                stock_sentiments[symbol] = summary
    else:
        stock_sentiments = {}
    
    # Kết hợp dữ liệu
    stocks_data = []
    for _, row in company_df.iterrows():
        symbol = row['symbol']
        sentiment_data = stock_sentiments.get(symbol, {})
        
        stocks_data.append({
            'symbol': symbol,
            'name': row['name'],
            'industry': row['industry'],
            'sentiment_status': sentiment_data.get('sentiment_status', 'neutral'),
            'avg_score': sentiment_data.get('avg_score', 0),
            'positive_ratio': sentiment_data.get('positive_ratio', 0),
            'negative_ratio': sentiment_data.get('negative_ratio', 0)
        })
    
    return render_template('stocks.html', stocks=stocks_data)

@app.route('/stock/<symbol>')
def stock_detail(symbol):
    """Trang chi tiết cổ phiếu"""
    # Đọc dữ liệu công ty
    company_file = os.path.join(DATA_DIR, 'sample_company_info.csv')
    if os.path.exists(company_file):
        company_df = pd.read_csv(company_file)
        company_info = company_df[company_df['symbol'] == symbol].to_dict('records')
        if company_info:
            company_info = company_info[0]
        else:
            company_info = {'symbol': symbol, 'name': f'Công ty Cổ phần {symbol}', 'industry': 'Chưa phân loại'}
    else:
        company_info = {'symbol': symbol, 'name': f'Công ty Cổ phần {symbol}', 'industry': 'Chưa phân loại'}
    
    # Đọc dữ liệu lịch sử
    historical_file = os.path.join(DATA_DIR, 'sample_historical_data.csv')
    if os.path.exists(historical_file):
        historical_df = pd.read_csv(historical_file)
        stock_data = historical_df[historical_df['symbol'] == symbol].sort_values('date')
        
        # Tạo dữ liệu cho biểu đồ
        chart_data = []
        for _, row in stock_data.iterrows():
            chart_data.append({
                'date': row['date'],
                'open': row['open'],
                'high': row['high'],
                'low': row['low'],
                'close': row['close'],
                'volume': row['volume']
            })
        
        # Chuyển thành JSON để sử dụng trong JavaScript
        chart_data_json = json.dumps(chart_data)
    else:
        chart_data_json = "[]"
    
    # Lấy dữ liệu sentiment
    sentiment_summary = get_stock_sentiment_summary(symbol)
    
    # Đọc tin tức
    news_file = os.path.join(DATA_DIR, 'sample_news_data.csv')
    if os.path.exists(news_file):
        news_df = pd.read_csv(news_file)
        stock_news = news_df[news_df['symbol'] == symbol].sort_values('date', ascending=False).to_dict('records')
    else:
        stock_news = []
    
    # Đọc kết quả sentiment
    sentiment_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    if os.path.exists(sentiment_file):
        sentiment_df = pd.read_csv(sentiment_file)
        stock_sentiment = sentiment_df[sentiment_df['symbol'] == symbol].sort_values('news_date', ascending=False).to_dict('records')
    else:
        stock_sentiment = []
    
    return render_template('stock_detail.html',
                          symbol=symbol,
                          company_info=company_info,
                          chart_data=chart_data_json,
                          sentiment_summary=sentiment_summary,
                          news=stock_news,
                          sentiment_results=stock_sentiment)

@app.route('/sentiment')
def sentiment():
    """Trang phân tích sentiment"""
    # Lấy dữ liệu sentiment thị trường
    market_sentiment = analyze_market_sentiment()
    
    # Đọc kết quả sentiment
    sentiment_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    if os.path.exists(sentiment_file):
        sentiment_df = pd.read_csv(sentiment_file)
        sentiment_results = sentiment_df.sort_values(['symbol', 'news_date'], ascending=[True, False]).to_dict('records')
    else:
        sentiment_results = []
    
    return render_template('sentiment.html',
                          market_sentiment=market_sentiment,
                          sentiment_results=sentiment_results)

@app.route('/about')
def about():
    """Trang giới thiệu"""
    return render_template('about.html')

@app.route('/api/collect_data', methods=['POST'])
def api_collect_data():
    """API thu thập dữ liệu"""
    try:
        collect_all_vn30_data()
        return jsonify({'success': True, 'message': 'Đã thu thập dữ liệu thành công'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Lỗi: {str(e)}'})

@app.route('/api/analyze_sentiment', methods=['POST'])
def api_analyze_sentiment():
    """API phân tích sentiment"""
    try:
        sentiment_df = analyze_news_data()
        return jsonify({'success': True, 'message': 'Đã phân tích sentiment thành công'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Lỗi: {str(e)}'})

@app.route('/api/stock_data/<symbol>')
def api_stock_data(symbol):
    """API lấy dữ liệu cổ phiếu"""
    try:
        # Đọc dữ liệu lịch sử
        historical_file = os.path.join(DATA_DIR, 'sample_historical_data.csv')
        if os.path.exists(historical_file):
            historical_df = pd.read_csv(historical_file)
            stock_data = historical_df[historical_df['symbol'] == symbol].sort_values('date')
            
            # Chuyển thành JSON
            data = stock_data.to_dict('records')
            return jsonify({'success': True, 'data': data})
        else:
            return jsonify({'success': False, 'message': 'Không tìm thấy dữ liệu'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Lỗi: {str(e)}'})

@app.route('/api/sentiment_data/<symbol>')
def api_sentiment_data(symbol):
    """API lấy dữ liệu sentiment"""
    try:
        # Lấy dữ liệu sentiment
        sentiment_summary = get_stock_sentiment_summary(symbol)
        
        if sentiment_summary:
            return jsonify({'success': True, 'data': sentiment_summary})
        else:
            return jsonify({'success': False, 'message': 'Không tìm thấy dữ liệu sentiment'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Lỗi: {str(e)}'})

if __name__ == '__main__':
    # Tạo dữ liệu mẫu nếu chưa có
    if not os.path.exists(os.path.join(DATA_DIR, 'sample_news_data.csv')):
        print("Đang thu thập dữ liệu...")
        collect_all_vn30_data()
    
    # Phân tích sentiment nếu chưa có
    if not os.path.exists(os.path.join(DATA_DIR, 'sentiment_results.csv')):
        print("Đang phân tích sentiment...")
        analyze_news_data()
    
    # Chạy ứng dụng
    app.run(host=HOST, port=PORT, debug=True)
