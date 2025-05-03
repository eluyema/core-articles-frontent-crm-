import {NavLink} from "@mantine/core";
import styles from './index.module.scss';
import {Link, useLocation} from "@tanstack/react-router";

const AdminPageSidebar = ()=> {
    const location = useLocation()

    return <div className={styles.sidebar}>
        <h4 className={styles.title}>Супер адмін панель</h4>
        <nav>
            <ul>
                <li>
                    <NavLink
                        component={Link}
                        label="Християнство"
                        leftSection="🙏"
                        to="/admin/christianity"
                    >
                        <NavLink component={Link} variant="subtle" to="/admin/christianity/categories" active={location.pathname.includes("/admin/christianity/categories")} label="Категорії" />
                        <NavLink component={Link} variant="subtle"  to="/admin/christianity/articles" active={location.pathname.includes("/admin/christianity/articles")} label="Статті" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
}

export default AdminPageSidebar;