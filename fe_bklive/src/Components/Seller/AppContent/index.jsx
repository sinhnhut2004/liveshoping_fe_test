import AppRouteSeller from "../Routes"

const AppContent = () => {
    return (
        // <div style={{ padding: '0 24px 24px' }}>
        // <Breadcrumb style={{ margin: '16px 0' }}>
        //   <Breadcrumb.Item>Home</Breadcrumb.Item>
        //   <Breadcrumb.Item>List</Breadcrumb.Item>
        //   <Breadcrumb.Item>App</Breadcrumb.Item>
        // </Breadcrumb>
        // </div>
        <div
          className="site-layout-content"
          style={{
            padding: 24,
            margin: 0,
          }}
        >
          <AppRouteSeller />
        </div>
      
    )
}

export default AppContent