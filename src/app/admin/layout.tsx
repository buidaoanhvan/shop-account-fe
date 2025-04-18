import { HeaderMenu } from "../../../components/header-menu";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderMenu />
      <div className="container mx-auto mt-5">{children}</div>
    </div>
  );
}
