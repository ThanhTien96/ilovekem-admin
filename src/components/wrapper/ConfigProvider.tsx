import React, { useMemo } from "react";
import { useAppSelector } from "reduxStore";
import { themes } from "configs";
import { Global } from "@emotion/react";
import { ConfigProvider } from "antd";

export interface XConfigProviderProps {
  children: React.ReactNode;
}

const XConfigProvider = (props: XConfigProviderProps) => {
  const { selected: selectedThemeKey, colorPrimary, ...restConfigProps } = useAppSelector(state => state.app.themeSlice);

  const selectedTheme = useMemo(
    () => ({
      ...themes[selectedThemeKey],
      token: {
        ...themes[selectedThemeKey].token,
        colorPrimary,
      },
    }),
    [selectedThemeKey, colorPrimary]
  );

  return (
    <>
      <Global
        styles={{
          ".ant-layout-sider-trigger": {
            backgroundColor:
            selectedTheme && selectedTheme.components?.Layout?.colorBgTrigger,
          },
        }}
      />
      <ConfigProvider {...restConfigProps} theme={selectedTheme}>
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default XConfigProvider;
