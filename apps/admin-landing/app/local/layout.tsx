import {
  DashProvider,
  DashSidebar,
  DashHeader,
  getSiteConfig,
} from "../components/dashboard";

const config = getSiteConfig("local");

export const metadata = {
  title: config.pageTitle,
};

export default function LocalDashLayout({
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
