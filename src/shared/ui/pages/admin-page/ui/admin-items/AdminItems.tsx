import scss from "./AdminItems.module.scss";

interface AdminItemsProps {
  children: React.ReactNode;
}

export const AdminItems = ({ children }: AdminItemsProps) => {
  return <div className={scss["admin-items"]}>{children}</div>;
};

export default AdminItems;