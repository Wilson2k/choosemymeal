import React from "react";
import Switch from '@mui/joy/Switch';
import DarkMode from '@mui/icons-material/DarkMode';

// Component for toggling dark/light mode
export default function ModeToggle({setMode, mode}) {
  const [mounted, setMounted] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Check local storage to see if dark mode set before reload
    const localStorageDarkMode = localStorage.getItem("joy-mode");

    // If is not null
    if (localStorageDarkMode) {
      if (localStorageDarkMode === 'dark') {
        setChecked(true);
      }
    }
  }, []);

  if (!mounted) {
    // To avoid layout shift, render a placeholder switch
    return <Switch
      checked={checked}
      componentsProps={{
        input: { 'aria-label': 'Dark mode' },
        thumb: {
          children: <DarkMode />,
        },
      }}
      sx={{
        '--Switch-thumb-size': '28px',
      }}
    />;
  }

  return (
    <Switch
      checked={checked}
      onChange={(event) => { setChecked(event.target.checked); setMode(mode === 'dark' ? 'light' : 'dark') }}
      componentsProps={{
        input: { 'aria-label': 'Dark mode'},
        thumb: {
          children: <DarkMode />,
        },
      }}
      sx={{
        '--Switch-thumb-size': '28px',
      }}
    />
  );
};