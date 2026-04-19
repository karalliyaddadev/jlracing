import {
  DashProvider,
  DashSidebar,
  DashHeader,
  getSiteConfig,
} from "../components/dashboard";

const config = getSiteConfig("international");

export const metadata = {
  title: config.pageTitle,
};

export default function InternationalDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashProvider config={config}>
      <div className="dash-shell">
        <DashSidebar />
        <div className="dash-main">
          <DashHeader />
          <div className="dash-content">{children}</div>
        </div>
      </div>
    </DashProvider>
  );
}
