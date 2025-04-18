"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "../lib/store/auth-store";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import { fetcher } from "../utils/fetcher";

export function LoginGoogle() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { token, user, setToken, setUser, clearAuth } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  const callGetUserAPI = async () => {
    const response = await fetcher(
      "http://localhost:3333/user/profile",
      "POST"
    );
    if (response.errorCode == "00" && response.success) {
      setUser(response.data);
    }
  };

  const callLoginKeyAPI = async (key: string) => {
    const payLoad = {
      key,
    };
    const response = await fetcher(
      "http://localhost:3333/auth/provider/login",
      "POST",
      payLoad
    );
    if (response.errorCode == "00" && response.success) {
      setToken(response.data.token);
      callGetUserAPI();
    }
    router.push("/");
  };

  const logoutUser = () => {
    clearAuth();
    router.push("/");
  };

  useEffect(() => {
    const key = searchParams.get("key");
    if (key) {
      callLoginKeyAPI(key);
    }
    setMounted(true);
  }, [searchParams]);

  if (!mounted)
    return (
      <div className="w-[48px] h-[48px] bg-gray-200 animate-pulse rounded-full" />
    );

  return (
    <div>
      {token ? (
        <Popover>
          <PopoverButton className="cursor-pointer bg-[#8E0002] rounded-full">
            <Image
              src={user?.avatar_url || "/user.svg"}
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full"
              priority
            />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom end"
            className="flex flex-col bg-white p-2 mt-3 shadow rounded-2xl"
          >
            <a href="/" className="p-2 px-4 hover:bg-gray-100 rounded-xl">
              <p>Tài khoản</p>
              <span className="text-sm text-gray-500">{user?.email}</span>
            </a>
            <a href="/" className="p-2 px-4 hover:bg-gray-100 rounded-xl">
              Danh sách đơn hàng
            </a>
            <a
              className="cursor-pointer p-2 px-4 hover:bg-[#8E0002] hover:text-white text-[#8E0002] font-bold rounded-xl"
              onClick={logoutUser}
            >
              Đăng Xuất
            </a>
          </PopoverPanel>
        </Popover>
      ) : (
        <a
          href="http://localhost:3333/auth/google"
          className="bg-[#8E0002] py-4 px-8 rounded-4xl text-white"
        >
          Đăng nhập
        </a>
      )}
    </div>
  );
}
