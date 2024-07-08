import { extendTheme } from '@chakra-ui/react';

// Custom function to handle color mode values
function getColorModeValue(lightValue, darkValue, props) {
  return props.colorMode === 'dark' ? darkValue : lightValue;
}

// Define the global styles using a more basic syntax
const styles = {
  global: function(props) {
    return {
      body: {
        // Background color changes based on the color mode (light or dark)
        bg: getColorModeValue("gray.100", "#000", props),
        // Text color changes based on the color mode (light or dark)
        color: getColorModeValue("gray.800", "whiteAlpha.900", props)
      }
    };
  }
};

// 1. Add your color mode config
const config = {
  initialColorMode: 'dark',  // Set the initial color mode to light
  useSystemColorMode: false,  // Do not use the system's color mode preference
};

// 2. Extend the theme with the configuration and styles
const theme = extendTheme({ config, styles });

export default theme;

/*
Tip: Chakra stores the color mode in localStorage or in cookies and appends a className to the body to ensure the 
color mode is persistent.
In case you need to reset the color mode, you must delete the item from localStorage or cookies, so on next page 
load the value is initialized like the first time user visited the page.
*/