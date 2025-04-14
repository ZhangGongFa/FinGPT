# FinGPT Việt Nam

FinGPT Việt Nam là một ứng dụng phân tích sentiment (tình cảm) cho cổ phiếu Việt Nam, sử dụng dữ liệu từ nhiều nguồn khác nhau và phân tích bằng trí tuệ nhân tạo.

## Tính năng chính

- **Phân tích sentiment cổ phiếu VN**: Sử dụng Gemini API để phân tích tin tức và đánh giá mức độ tích cực/tiêu cực
- **Dữ liệu đa nguồn**: Thu thập dữ liệu từ CafeF, SSI iBoard và Yahoo Finance
- **Giao diện trực quan**: Thiết kế responsive với biểu đồ và bảng dữ liệu dễ đọc
- **Tìm kiếm và lọc**: Tìm kiếm cổ phiếu và lọc theo ngành, loại sentiment
- **Phân tích thị trường**: Đánh giá xu hướng tổng thể của thị trường dựa trên phân tích sentiment

## Cài đặt

### Yêu cầu

- Python 3.8+
- Flask
- Pandas
- Requests
- BeautifulSoup4
- Google Generative AI (cho Gemini API)

### Cài đặt thư viện

```bash
pip install -r requirements.txt
```

### Cấu hình

Chỉnh sửa file `src/config.py` để cấu hình:
- API key cho Gemini
- Đường dẫn lưu trữ dữ liệu
- Cổng và host cho ứng dụng web

## Sử dụng

### Chạy ứng dụng

```bash
python app.py
```

Sau đó truy cập ứng dụng tại: http://localhost:5000

### Thu thập dữ liệu

```bash
python -c "from src.data_collector import collect_all_vn30_data; collect_all_vn30_data()"
```

### Phân tích sentiment

```bash
python -c "from src.sentiment_analyzer import analyze_news_data; analyze_news_data()"
```

## Cấu trúc dự án

```
fingpt_vietnam/
├── app.py                  # Ứng dụng Flask chính
├── data/                   # Thư mục chứa dữ liệu
│   ├── cafef/              # Dữ liệu từ CafeF
│   ├── ssi/                # Dữ liệu từ SSI iBoard
│   ├── yahoo/              # Dữ liệu từ Yahoo Finance
│   ├── sample_company_info.csv
│   ├── sample_historical_data.csv
│   ├── sample_news_data.csv
│   └── sentiment_results.csv
├── src/                    # Mã nguồn
│   ├── config.py           # Cấu hình
│   ├── data_collector.py   # Thu thập dữ liệu
│   └── sentiment_analyzer.py # Phân tích sentiment
├── static/                 # Tài nguyên tĩnh
│   ├── css/                # CSS
│   └── js/                 # JavaScript
└── templates/              # Templates HTML
    ├── about.html
    ├── index.html
    ├── sentiment.html
    ├── stock_detail.html
    └── stocks.html
```

## API

### API thu thập dữ liệu

```
POST /api/collect_data
```

### API phân tích sentiment

```
POST /api/analyze_sentiment
```

### API lấy dữ liệu cổ phiếu

```
GET /api/stock_data/<symbol>
```

### API lấy dữ liệu sentiment

```
GET /api/sentiment_data/<symbol>
```

## Nguồn dữ liệu

- [CafeF](https://cafef.vn)
- [SSI iBoard](https://iboard.ssi.com.vn)
- [Yahoo Finance](https://finance.yahoo.com)

## Giấy phép

Dự án này được phân phối dưới giấy phép MIT.
