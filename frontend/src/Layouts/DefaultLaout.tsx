import { Outlet } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { Button } from "primereact/button";

function DefaultLayout() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="flex items-center justify-center  w-svw">
      {!isVisible && (
        <div className="p-2 fixed top-0 left-0">
          <Button
            icon="pi pi-bars"
            onClick={() => {
              setIsVisible(!isVisible);
            }}
          />
        </div>
      )}
      <Sidebar
        onHide={() => {
          setIsVisible(!isVisible);
        }}
        visible={isVisible}
        className="rounded-2xl p-2"
      />
      <div className="w-svw max-w-4xl flex items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
