import PropTypes from "prop-types";
function Header({ text }) {
  return (
    <header>
      <h1 style={{ textAlign: "center", margin: "auto" }}>{text}</h1>
    </header>
  );
}

Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
