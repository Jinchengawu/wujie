import React from "react";
import hostMap from "../hostMap";
import fetch from "../fetch";
import WujieReact from "wujie-react";
import { useNavigate, useLocation } from "react-router-dom";
import lifecycles from "../lifecycle";

export default function Klein() {
  console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  const location = useLocation();
  const navigation = useNavigate();
  const KleinUrl = hostMap("//localhost:3090/");
  const path = location.pathname.replace("/klein-sub", "").replace("/klein", "");////
  // 告诉子应用要跳转哪个路由
  WujieReact.bus.$emit("klein-router-change", path);
  const degrade = window.localStorage.getItem("degrade") === "true";
  // 修正iframe的url，防止github pages csp报错
  const attrs = process.env.NODE_ENV === "production" ? { src: KleinUrl } : {};
  const props = {
    jump: (name) => {
      navigation(`/${name}`);
    },
  };
  console.log('Klein')
  return (
    // 保活模式，name相同则复用一个子应用实例，改变url无效，必须采用通信的方式告知路由变化
    <WujieReact
      width="100%"
      height="100%"
      name="klein"
      url={KleinUrl}
      alive={true}
      sync={true}
      fetch={fetch}
      props={props}
      attrs={attrs}
      degrade={degrade}
      beforeLoad={lifecycles.beforeLoad}
      beforeMount={lifecycles.beforeMount}
      afterMount={lifecycles.afterMount}
      beforeUnmount={lifecycles.beforeUnmount}
      afterUnmount={lifecycles.afterUnmount}
      activated={lifecycles.activated}
      deactivated={lifecycles.deactivated}
      loadError={lifecycles.loadError}
    ></WujieReact>
  );
}
