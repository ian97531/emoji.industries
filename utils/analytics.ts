import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("UA-154918929-1");
};

export const logPageView = (url: string = window.location.pathname) => {
  ReactGA.set({ page: url });
  ReactGA.pageview(url);
};

export const logEvent = (category = "", action = "") => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = "", fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
