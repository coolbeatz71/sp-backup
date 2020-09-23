import styles from "./../navbar.module.scss";
import capitalize from "helpers/capitalize";
import logout from "redux/actions/Auth/logout";
import { Menu } from "antd";
import Link from "next/link";
import {
  USER_CAUSES_PATH,
  CHANGE_PIN_PATH,
  CREATE_CAUSE_PATH,
} from "helpers/paths";
import { Dispatch } from "redux";

const UserMenu = (
  first_name: string,
  last_name: string,
  dispatch: Dispatch<any>,
  push: any
) => {
  return (
    <Menu>
      <Menu.Item className={styles.navbar__avatar__name}>
        <span>
          {first_name || last_name
            ? capitalize(`${first_name} ${last_name}`)
            : "..."}
        </span>
      </Menu.Item>
      <Menu.Divider className="avatar__profile__divider" />
      <Menu.Item>
        <Link href="/profile">
          <a rel="noreferrer noopener">Profile</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item>
        <Link href={CREATE_CAUSE_PATH}>
          <a rel="noreferrer noopener">New Cause</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item>
        <Link href={USER_CAUSES_PATH}>
          <a rel="noreferrer noopener">My Causes</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item>
        <Link href={CHANGE_PIN_PATH}>
          <a rel="noreferrer noopener">Change PIN</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />

      <Menu.Item
        className="navbar__menu__logout"
        onClick={() => logout(push, dispatch)}
      >
        Sign Out
      </Menu.Item>
    </Menu>
  );
};

export default UserMenu;
