// Main JavaScript for FinGPT Việt Nam - Updated Version

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize market chart if element exists
    initMarketChart();
    
    // Initialize sentiment pie chart if element exists
    initSentimentPieChart();
    
    // Initialize stock detail chart if element exists
    initStockDetailChart();
    
    // Update sentiment scores visualization
    updateSentimentScores();
});

// Market Chart Initialization
function initMarketChart() {
    const ctx = document.getElementById('marketChart');
    
    if (!ctx) return;
    
    // Get market data from API
    fetch('/api/market_data')
        .then(response => response.json())
        .then(marketData => {
            // Create simulated intraday data based on current values
            const vnIndex = marketData.vn_index.value;
            const hnxIndex = marketData.hnx_index.value;
            
            // Generate data points for the day (simulated)
            const generateDataPoints = (baseValue, change) => {
                const points = [];
                const volatility = Math.abs(change) / 2;
                
                // Start with a value that will end at the current value
                let startValue = baseValue - change;
                
                // Generate 7 points for the trading day
                for (let i = 0; i < 7; i++) {
                    // Add some random noise to create a realistic chart
                    const noise = (Math.random() - 0.5) * volatility;
                    // Progress toward the final value
                    const progress = i / 6; // 0 to 1
                    const value = startValue + (change * progress) + noise;
                    points.push(value);
                }
                
                // Ensure the last point is exactly the current value
                points[6] = baseValue;
                
                return points;
            };
            
            // Calculate changes (simulated)
            const vnIndexChange = marketData.vn_index.change;
            const hnxIndexChange = marketData.hnx_index.change;
            
            // Generate data points
            const vnIndexData = generateDataPoints(vnIndex, vnIndexChange);
            const hnxIndexData = generateDataPoints(hnxIndex, hnxIndexChange);
            
            // Create chart
            const marketChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
                    datasets: [
                        {
                            label: 'VN-Index',
                            data: vnIndexData,
                            borderColor: '#0d6efd',
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'HNX-Index',
                            data: hnxIndexData,
                            borderColor: '#198754',
                            backgroundColor: 'rgba(25, 135, 84, 0.1)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching market data:', error);
            
            // Fallback to static data if API fails
            const marketChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
                    datasets: [
                        {
                            label: 'VN-Index',
                            data: [1220, 1225, 1228, 1223, 1230, 1232, 1235.67],
                            borderColor: '#0d6efd',
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'HNX-Index',
                            data: [230, 231, 232, 231.5, 233, 234, 234.56],
                            borderColor: '#198754',
                            backgroundColor: 'rgba(25, 135, 84, 0.1)',
                            borderWidth: 2,
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        });
}

// Sentiment Pie Chart Initialization
function initSentimentPieChart() {
    const ctx = document.getElementById('sentimentPieChart');
    
    if (!ctx) return;
    
    // Get sentiment data from API
    fetch('/api/sentiment_overview')
        .then(response => response.json())
        .then(sentimentData => {
            const sentimentPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tích cực', 'Trung tính', 'Tiêu cực'],
                    datasets: [{
                        data: [
                            sentimentData.positive, 
                            sentimentData.neutral, 
                            sentimentData.negative
                        ],
                        backgroundColor: [
                            '#198754',  // success
                            '#ffc107',  // warning
                            '#dc3545'   // danger
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${percentage}% (${value.toFixed(1)})`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching sentiment data:', error);
            
            // Fallback to static data if API fails
            const sentimentPieChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Tích cực', 'Trung tính', 'Tiêu cực'],
                    datasets: [{
                        data: [65, 25, 10],
                        backgroundColor: [
                            '#198754',  // success
                            '#ffc107',  // warning
                            '#dc3545'   // danger
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return `${label}: ${percentage}% (${value})`;
                                }
                            }
                        }
                    }
                }
            });
        });
}

// Stock Detail Chart Initialization
function initStockDetailChart() {
    const ctx = document.getElementById('stockDetailChart');
    
    if (!ctx) return;
    
    // Get symbol from URL
    const pathParts = window.location.pathname.split('/');
    const symbol = pathParts[pathParts.length - 1];
    
    // Get stock data from API
    fetch(`/api/stock/${symbol}`)
        .then(response => response.json())
        .then(stockData => {
            // Extract historical data
            const historicalData = stockData.historical_data;
            
            // Prepare data for chart
            const dates = historicalData.map(item => item.date);
            const prices = historicalData.map(item => item.close);
            
            // Create chart
            const stockDetailChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: `${symbol} - Giá đóng cửa`,
                        data: prices,
                        borderColor: '#0d6efd',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            
            // Display error message in chart area
            ctx.parentNode.innerHTML = `<div class="alert alert-danger">Không thể tải dữ liệu cho ${symbol}. Vui lòng thử lại sau.</div>`;
        });
}

// Search functionality
function setupSearch() {
    const searchInputs = document.querySelectorAll('input[placeholder*="cổ phiếu"]');
    
    searchInputs.forEach(searchInput => {
        const searchButton = searchInput.nextElementSibling;
        
        function performSearch() {
            const symbol = searchInput.value.trim().toUpperCase();
            if (symbol) {
                window.location.href = `/stocks/${symbol}`;
            }
        }
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
    });
}

// Sentiment score visualization
function updateSentimentScores() {
    const sentimentScores = document.querySelectorAll('.sentiment-score');
    
    sentimentScores.forEach(score => {
        const value = parseFloat(score.dataset.score);
        const bar = score.querySelector('.sentiment-score-bar');
        
        if (!bar) return;
        
        // Convert score from -1...1 to 0...100 for width percentage
        const percentage = ((value + 1) / 2) * 100;
        bar.style.width = `${percentage}%`;
        
        if (value > 0.2) {
            bar.classList.add('positive');
        } else if (value < -0.2) {
            bar.classList.add('negative');
        } else {
            bar.classList.add('neutral');
        }
    });
}

// Filter functionality for sentiment and stocks pages
function setupFilters() {
    // Sentiment page filters
    const sentimentFilterButtons = document.querySelectorAll('.sentiment-filter .btn-group [data-filter]');
    const sentimentRows = document.querySelectorAll('.sentiment-table tbody tr');
    
    if (sentimentFilterButtons.length > 0 && sentimentRows.length > 0) {
        sentimentFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                sentimentFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide rows based on filter
                sentimentRows.forEach(row => {
                    if (filter === 'all' || row.getAttribute('data-sentiment') === filter) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Stocks page filters
    const stockFilterButtons = document.querySelectorAll('.stocks-filter .btn-group [data-filter]');
    const stockRows = document.querySelectorAll('.stocks-table tbody tr');
    
    if (stockFilterButtons.length > 0 && stockRows.length > 0) {
        stockFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                stockFilterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide rows based on filter
                stockRows.forEach(row => {
                    if (filter === 'all' || row.getAttribute('data-industry') === filter) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Search functionality for tables
function setupTableSearch() {
    const searchInputs = document.querySelectorAll('input[id$="Search"]');
    
    searchInputs.forEach(searchInput => {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const tableId = this.id.replace('Search', '');
            const rows = document.querySelectorAll(`#${tableId}Table tbody tr`);
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
}

// Auto-refresh data
function setupAutoRefresh() {
    // Only set up auto-refresh on pages that need it
    if (document.getElementById('marketChart') || document.querySelector('.market-index')) {
        // Refresh market data every 5 minutes
        setInterval(() => {
            fetch('/api/market_data')
                .then(response => response.json())
                .then(marketData => {
                    // Update market indices
                    updateMarketIndices(marketData);
                    
                    // Reinitialize market chart
                    initMarketChart();
                })
                .catch(error => {
                    console.error('Error refreshing market data:', error);
                });
        }, 300000); // 5 minutes
    }
}

// Update market indices with new data
function updateMarketIndices(marketData) {
    // Update VN-Index
    const vnIndexValue = document.querySelector('.market-index:nth-child(1) .index-value');
    const vnIndexChange = document.querySelector('.market-index:nth-child(1) .index-change');
    const vnIndexIcon = document.querySelector('.market-index:nth-child(1) i');
    
    if (vnIndexValue && vnIndexChange && vnIndexIcon) {
        vnIndexValue.textContent = marketData.vn_index.value;
        
        if (marketData.vn_index.change > 0) {
            vnIndexChange.textContent = `+${marketData.vn_index.change} (+${marketData.vn_index.change_percent}%)`;
            vnIndexChange.className = 'index-change positive';
            vnIndexIcon.className = 'bi bi-arrow-up-circle-fill text-success fs-3';
        } else if (marketData.vn_index.change < 0) {
            vnIndexChange.textContent = `${marketData.vn_index.change} (${marketData.vn_index.change_percent}%)`;
            vnIndexChange.className = 'index-change negative';
            vnIndexIcon.className = 'bi bi-arrow-down-circle-fill text-danger fs-3';
        } else {
            vnIndexChange.textContent = '0.00 (0.00%)';
            vnIndexChange.className = 'index-change';
            vnIndexIcon.className = 'bi bi-dash-circle-fill text-secondary fs-3';
        }
    }
    
    // Update HNX-Index
    const hnxIndexValue = document.querySelector('.market-index:nth-child(2) .index-value');
    const hnxIndexChange = document.querySelector('.market-index:nth-child(2) .index-change');
    const hnxIndexIcon = document.querySelector('.market-index:nth-child(2) i');
    
    if (hnxIndexValue && hnxIndexChange && hnxIndexIcon) {
        hnxIndexValue.textContent = marketData.hnx_index.value;
        
        if (marketData.hnx_index.change > 0) {
            hnxIndexChange.textContent = `+${marketData.hnx_index.change} (+${marketData.hnx_index.change_percent}%)`;
            hnxIndexChange.className = 'index-change positive';
            hnxIndexIcon.className = 'bi bi-arrow-up-circle-fill text-success fs-3';
        } else if (marketData.hnx_index.change < 0) {
            hnxIndexChange.textContent = `${marketData.hnx_index.change} (${marketData.hnx_index.change_percent}%)`;
            hnxIndexChange.className = 'index-change negative';
            hnxIndexIcon.className = 'bi bi-arrow-down-circle-fill text-danger fs-3';
        } else {
            hnxIndexChange.textContent = '0.00 (0.00%)';
            hnxIndexChange.className = 'index-change';
            hnxIndexIcon.className = 'bi bi-dash-circle-fill text-secondary fs-3';
        }
    }
    
    // Update UPCOM-Index
    const upcomIndexValue = document.querySelector('.market-index:nth-child(3) .index-value');
    const upcomIndexChange = document.querySelector('.market-index:nth-child(3) .index-change');
    const upcomIndexIcon = document.querySelector('.market-index:nth-child(3) i');
    
    if (upcomIndexValue && upcomIndexChange && upcomIndexIcon) {
        upcomIndexValue.textContent = marketData.upcom_index.value;
        
        if (marketData.upcom_index.change > 0) {
            upcomIndexChange.textContent = `+${marketData.upcom_index.change} (+${marketData.upcom_index.change_percent}%)`;
            upcomIndexChange.className = 'index-change positive';
            upcomIndexIcon.className = 'bi bi-arrow-up-circle-fill text-success fs-3';
        } else if (marketData.upcom_index.change < 0) {
            upcomIndexChange.textContent = `${marketData.upcom_index.change} (${marketData.upcom_index.change_percent}%)`;
            upcomIndexChange.className = 'index-change negative';
            upcomIndexIcon.className = 'bi bi-arrow-down-circle-fill text-danger fs-3';
        } else {
            upcomIndexChange.textContent = '0.00 (0.00%)';
            upcomIndexChange.className = 'index-change';
            upcomIndexIcon.className = 'bi bi-dash-circle-fill text-secondary fs-3';
        }
    }
    
    // Update timestamp
    const timestamp = document.querySelector('.update-timestamp');
    if (timestamp) {
        const now = new Date();
        timestamp.textContent = `Cập nhật: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    }
}

// Initialize all interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize market chart and sentiment pie chart
    initMarketChart();
    initSentimentPieChart();
    
    // Initialize stock detail chart if on stock detail page
    initStockDetailChart();
    
    // Update sentiment scores visualization
    updateSentimentScores();
    
    // Set up search functionality
    setupSearch();
    
    // Set up filters
    setupFilters();
    
    // Set up table search
    setupTableSearch();
    
    // Set up auto-refresh
    setupAutoRefresh();
});
