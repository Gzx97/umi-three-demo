import { ProLayout } from "@ant-design/pro-layout";
import { ConfigProvider } from "antd";
import { Link, Outlet, useAppData, useLocation } from "umi";
import { LayoutContextProvider } from "./components/LayoutProvider";

export default function Layout() {
  const { clientRoutes } = useAppData();
  const location = useLocation();
  return (
    <LayoutContextProvider value={{ globalData: {} }}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: "#00b96b",
            borderRadius: 2,

            // 派生变量，影响范围小
            colorBgContainer: "#f6ffed",
          },
        }}
      >
        <ProLayout
          route={clientRoutes[0]}
          location={location}
          title="Umi4 + Antd + Three"
          menuItemRender={(menuItemProps, defaultDom) => {
            if (menuItemProps.isUrl || menuItemProps.children) {
              return defaultDom;
            }
            if (
              menuItemProps.path &&
              location.pathname !== menuItemProps.path
            ) {
              return (
                <Link to={menuItemProps.path} target={menuItemProps.target}>
                  {defaultDom}
                </Link>
              );
            }
            return defaultDom;
          }}
        >
          <Outlet />
        </ProLayout>
      </ConfigProvider>
    </LayoutContextProvider>
  );
}
