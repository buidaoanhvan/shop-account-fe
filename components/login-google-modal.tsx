"use client";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../lib/store/auth-store";
import { useRouter } from "next/navigation";

export function LoginGoogleModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const { requireLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (requireLogin) {
      router.push("/");
      modalRef.current?.showModal();
    }
  }, [requireLogin]);

  return (
    <dialog ref={modalRef} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-3">Đăng nhập</h3>
        <a
          href="http://localhost:3333/auth/google"
          className="bg-[#8E0002] rounded-4xl text-white m-0 w-full btn btn-lg"
        >
          Đăng nhập với Google
        </a>
      </div>
    </dialog>
  );
}
