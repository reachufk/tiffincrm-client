import { render } from 'react-dom';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';


export const SideNav = () => {

      const menuItemsAdmin = [{ label: "Link", route: "link1" }, { label: "Link", route: "link1" }, { label: "Link", route: "link1" }, { label: "Link", route: "link1" }]
      const menuItemsUser = [{ label: "ULink", route: "Ulink1" }, { label: "ULink", route: "Ulink1" }, { label: "ULink", route: "Ulink1" }, { label: "ULink", route: "Ulink1" }]

      return (
            <>
                  <Sidebar>
                        <Menu>
                              {menuItemsAdmin.map(({label,route}, index) => (
                                    <MenuItem key={index}>{label}{index+1}</MenuItem>
                              ))}
                        </Menu>
                  </Sidebar>
            </>
      )

}