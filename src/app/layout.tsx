'use client';

import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                FinGPT Việt Nam
              </Link>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="hover:text-blue-200 transition duration-150">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/stocks" className="hover:text-blue-200 transition duration-150">
                    Cổ phiếu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-blue-200 transition duration-150">
                    Giới thiệu
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FinGPT Việt Nam</h3>
              <p className="text-gray-300">
                Công cụ phân tích sentiment cổ phiếu Việt Nam sử dụng trí tuệ nhân tạo
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white transition duration-150">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="/stocks" className="text-gray-300 hover:text-white transition duration-150">
                    Danh sách cổ phiếu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white transition duration-150">
                    Giới thiệu
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Nguồn dữ liệu</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://cafef.vn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition duration-150"
                  >
                    CafeF
                  </a>
                </li>
                <li>
                  <a 
                    href="https://iboard.ssi.com.vn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition duration-150"
                  >
                    SSI iBoard
                  </a>
                </li>
                <li>
                  <a 
                    href="https://github.com/AI4Finance-Foundation/FinGPT" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition duration-150"
                  >
                    FinGPT
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} FinGPT Việt Nam. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
