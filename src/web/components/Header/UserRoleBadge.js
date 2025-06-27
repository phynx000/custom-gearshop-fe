import React from "react";
import { Badge } from "react-bootstrap";
import { useUserRole } from "../../../hook/useUserRole";
import { hasAdminAccess, getRoleDisplayName } from "../../../utils/roleUtils";

const UserRoleBadge = () => {
  const { roleData, loading } = useUserRole();

  if (loading || !roleData || !hasAdminAccess(roleData)) {
    return null;
  }

  return (
    <Badge
      bg="warning"
      text="dark"
      className="ms-1"
      style={{ fontSize: "0.7rem" }}
    >
      {getRoleDisplayName(roleData)}
    </Badge>
  );
};

export default UserRoleBadge;
