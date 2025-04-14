'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Giới thiệu về FinGPT Việt Nam</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Tổng quan</h2>
        <p className="mb-4">
          FinGPT Việt Nam là một ứng dụng phân tích sentiment cho cổ phiếu Việt Nam, giúp nhà đầu tư đưa ra quyết định dựa trên dữ liệu và phân tích AI. Ứng dụng này được phát triển dựa trên dự án FinGPT gốc từ AI4Finance-Foundation, nhưng được điều chỉnh đặc biệt cho thị trường Việt Nam với dữ liệu từ CafeF và SSI iBoard.
        </p>
        <p>
          Bằng cách kết hợp dữ liệu thị trường với phân tích sentiment từ tin tức và thông tin liên quan, FinGPT Việt Nam cung cấp cái nhìn toàn diện về tình hình cổ phiếu và xu hướng thị trường.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Tính năng chính</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Phân tích sentiment cổ phiếu</h3>
            <p className="text-gray-700">
              Phân tích mức độ tích cực/tiêu cực của tin tức và thông tin liên quan đến cổ phiếu Việt Nam, giúp nhà đầu tư nắm bắt tâm lý thị trường.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Dữ liệu từ nguồn uy tín</h3>
            <p className="text-gray-700">
              Tích hợp dữ liệu từ các nguồn uy tín như CafeF và SSI iBoard để cung cấp thông tin chính xác và cập nhật về cổ phiếu Việt Nam.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Biểu đồ trực quan</h3>
            <p className="text-gray-700">
              Hiển thị dữ liệu và kết quả phân tích dưới dạng biểu đồ trực quan, giúp người dùng dễ dàng nắm bắt thông tin và xu hướng.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Tìm kiếm và lọc cổ phiếu</h3>
            <p className="text-gray-700">
              Tìm kiếm nhanh chóng và lọc cổ phiếu theo ngành, loại sentiment, và các tiêu chí khác, giúp người dùng dễ dàng tìm kiếm thông tin cần thiết.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Phân tích thị trường tổng thể</h3>
            <p className="text-gray-700">
              Đánh giá xu hướng tổng thể của thị trường dựa trên phân tích sentiment của nhiều cổ phiếu, giúp nhà đầu tư có cái nhìn toàn cảnh.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Giao diện responsive</h3>
            <p className="text-gray-700">
              Thiết kế tương thích với mọi thiết bị, từ máy tính để bàn đến điện thoại di động, giúp người dùng có thể truy cập thông tin mọi lúc, mọi nơi.
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Công nghệ sử dụng</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Next.js - Framework React hiện đại</li>
              <li>Tailwind CSS - Framework CSS tiện ích</li>
              <li>Recharts - Thư viện biểu đồ cho React</li>
              <li>TypeScript - Ngôn ngữ lập trình với kiểu dữ liệu tĩnh</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Next.js API Routes - API endpoints</li>
              <li>Gemini API - Phân tích sentiment</li>
              <li>CafeF API - Dữ liệu cổ phiếu Việt Nam</li>
              <li>SSI iBoard API - Dữ liệu thị trường chứng khoán</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Triển khai</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cloudflare Workers - Hosting và serverless functions</li>
              <li>Cloudflare Pages - Static site hosting</li>
              <li>GitHub - Quản lý mã nguồn</li>
              <li>CI/CD - Tự động hóa quy trình triển khai</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Nguồn gốc</h2>
        <p className="mb-4">
          FinGPT Việt Nam được phát triển dựa trên dự án FinGPT gốc từ AI4Finance-Foundation, một dự án mã nguồn mở nhằm ứng dụng các mô hình ngôn ngữ lớn (LLM) vào lĩnh vực tài chính.
        </p>
        <p className="mb-4">
          Dự án FinGPT gốc cung cấp các công cụ và phương pháp để phân tích dữ liệu tài chính, bao gồm phân tích sentiment, dự đoán giá, và phân tích báo cáo tài chính.
        </p>
        <p>
          FinGPT Việt Nam đã điều chỉnh và mở rộng các công cụ này để phù hợp với thị trường chứng khoán Việt Nam, với dữ liệu từ các nguồn địa phương và phân tích phù hợp với đặc thù của thị trường Việt Nam.
        </p>
      </div>
      
      <div className="bg-blue-50 rounded-lg shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Bắt đầu sử dụng FinGPT Việt Nam</h2>
        <p className="text-lg text-gray-700 mb-6">
          Khám phá các cổ phiếu Việt Nam với phân tích sentiment và dữ liệu thị trường
        </p>
        <Link 
          href="/stocks" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Xem danh sách cổ phiếu
        </Link>
      </div>
    </div>
  );
}
