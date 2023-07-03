export const handleLogout = () => {
  localStorage.removeItem("ps_token");
  window.location.reload();
};
