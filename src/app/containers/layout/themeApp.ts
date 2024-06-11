export interface Style {
  background: string;
  color: string;
  hover_background?: string;
  hover_color?: string;
}

export interface Nav {
  background: string;
  color: string;
  navItem: Style;
  navLink: Style;
  navLinkActive?: Style;
  icon?: Style;
}
export interface Theme {
  header: Style;
  footer: Style;
  sidebar: Style;
  nav: Nav;
}


