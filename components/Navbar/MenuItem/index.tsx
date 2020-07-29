import { Menu } from "antd";
import styles from "./../navbar.module.scss";

const MenuItem = (props: any) => {
  return (
    <>
      <Menu.Item className={styles.navbar__menu__item} {...props}>
        {props.children}
      </Menu.Item>
      <Menu.Divider className={styles.navbar__menu__divider} />
    </>
  );
};

export default MenuItem;
