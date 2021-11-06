import styled from 'styled-components';

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  a {
    color: ${(props) => props.theme.colors.font};
    text-decoration: none;
  }
  header {
    font-size: 3.6rem;
  }
  .appname {
    display: none;
  }
  .menu {
    flex-basis: 50%;
    display: flex;
    justify-content: space-around;
    list-style: none;
    font-size: 2.4rem;
  }
  .active {
    i,
    span {
      color: ${(props) => props.theme.colors.buttonSecondaryBackground};
    }
  }
  .menu-item_label {
    display: none;
  }
  .menu-item:hover {
    cursor: pointer;
    .icon {
      color: ${(props) => props.theme.colors.font};
    }
  }
  .icon {
    color: ${(props) => props.theme.colors.icon};
    margin-right: 10px;
  }

  @media (min-width: 810px) {
    .appname {
      display: inline;
    }
  }
  @media (min-width: 1400px) {
    .menu {
      font-size: 1.8rem;
    }
    .menu-item_label {
      display: inline;
    }
  }
`;

export default Navigation;
