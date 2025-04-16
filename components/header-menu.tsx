import Link from "next/link";
import React from "react";
import { LoginGoogle } from "./login-google";
import { Suspense } from "react";

export function HeaderMenu() {
  return (
    <div className="p-6 shadow">
      <div className="container flex justify-between items-center mx-auto">
        <h1 className="font-bold text-2xl">Shop Tài Khoản</h1>
        <div className="flex gap-8 items-center">
          <Link href="/">Trang chủ</Link>
          <Link href="/">Cửa hàng</Link>
          <Link href="/">Hỗ trợ</Link>
          <Suspense fallback={<div>Đang xử lý...</div>}>
            <LoginGoogle />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
