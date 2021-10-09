import styled from 'styled-components';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  a {
    color: #ddd;
    text-decoration: none;
  }
  header {
    font-size: 36px;
  }
  .appname {
    display: none;
  }
  .menu {
    flex-basis: 50%;
    display: flex;
    justify-content: space-around;
    list-style: none;
    font-size: 24px;
  }
  .menu-item_label {
    display: none;
  }
  .menu-item:hover {
    cursor: pointer;
    .icon {
      color: #ddd;
    }
  }
  .icon {
    color: #66d9ff;
    margin-right: 10px;
  }

  @media (min-width: 810px) {
    .appname {
      display: inline;
    }
  }
  @media (min-width: 1400px) {
    .menu {
      font-size: 18px;
    }
    .menu-item_label {
      display: inline;
    }
  }
`;

export default Navigation;
