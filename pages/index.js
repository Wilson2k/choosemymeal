import { useState } from 'react';
import { Typography, Box, TextField, FormLabel, Sheet, Slider, Button, CircularProgress, Link } from "@mui/joy"
import { Card, CardOverflow, AspectRatio } from "@mui/joy"
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import BreakfastDiningIcon from '@mui/icons-material/BreakfastDining';
import ModeToggle from "../components/modetoggle"
import { useColorScheme } from '@mui/joy';


// Main Page
export default function Home() {
  const { mode, setMode } = useColorScheme();
  const [data, setData] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState(1);
  const [meal, setMeal] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    fetch('/api/random?' + new URLSearchParams({
      location: location,
      meal: meal,
      distance: distance,
    }))
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setData(data.error);
        } else {
          setData(data);
        }
        setIsLoading(false)
      })
  };

  const handleLocationInput = (e) => {
    setLocation(e.target.value)
  };

  const handleMealInput = (e) => {
    setMeal(e.target.value)
  };

  const handleDistanceInput = (e) => {
    setDistance(e.target.value)
  };
  return (
    <Box
      sx={{
        py: 2,
        gap: 2,
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingInline: '10px'
      }}>
      <Typography level="display2">
        Choose My Meal
      </Typography>
      <TextField
        label="Location: City and State or Zip Code"
        placeholder="Location"
        size="lg"
        variant="outlined"
        onChange={handleLocationInput}
      />
      <RadioGroup
        aria-label="meal"
        overlay
        name="meal"
        onChange={handleMealInput}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 2,
          [`& .${radioClasses.checked}`]: {
            [`& .${radioClasses.action}`]: {
              inset: -1,
              border: '3px solid',
              borderColor: 'primary.500',
            },
          },
          [`& .${radioClasses.radio}`]: {
            display: 'contents',
            '& > svg': {
              zIndex: 2,
              position: 'relative',
              top: '-8px',
              right: '-8px',
              bgcolor: 'background.body',
              borderRadius: '50%',
            },
          },
        }}
      >
        {['Breakfast', 'Lunch', 'Dinner'].map((value) => (
          <Sheet
            key={value}
            variant="outlined"
            sx={{
              borderRadius: 'md',
              bgcolor: 'background.level1',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              p: 2,
              width: 1 / 3,
              '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
            }}
          >
            <Radio id={value} value={value} />
            {value === 'Breakfast' && <BreakfastDiningIcon />}
            {value === 'Lunch' && <LunchDiningIcon />}
            {value === 'Dinner' && <DinnerDiningIcon />}
            <FormLabel htmlFor={value}>{value}</FormLabel>
          </Sheet>
        ))}
      </RadioGroup>
      <Box sx={{ display: 'space-between', paddingRight: '48px' }}>
        <Typography level='body1' gutterBottom sx={{ mr: 'auto' }}>
          Distance: {distance} mile(s)
        </Typography>
        <ModeToggle setMode={setMode} mode={mode} />
      </Box>
      <Box sx={{ paddingInline: 2 }}>
        <Slider
          aria-label="Distance"
          step={1}
          min={1}
          max={25}
          onChange={handleDistanceInput}
          valueLabelDisplay="auto"
        />
      </Box>
      {location && meal && distance && <Button
        size="md"
        onClick={handleClick}
        sx={(theme) => ({
          background: `linear-gradient(-45deg, ${theme.vars.palette.primary[800]}, ${theme.vars.palette.primary[500]})`,
          fontWeight: 'lg',
          '&:hover': {
            background: `linear-gradient(-45deg, ${theme.vars.palette.primary[900]}, ${theme.vars.palette.primary[600]})`,
            boxShadow: 'md',
          },
          width: '100%'
        })}

      >
        Go
      </Button>}
      {isLoading ? <CircularProgress sx={{ mt: '25%', justifySelf: 'center' }} /> : <div>

        {typeof data === 'string' ? <Typography sx={{ mt: '25%', textAlign: 'center' }}>{data}</Typography> :
          <Card variant="outlined" sx={{ '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}>
            <CardOverflow>
              <AspectRatio ratio="2">
                <img
                  src={data.image_url}
                  alt={data.name}
                />
              </AspectRatio>
            </CardOverflow>
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                  {data.name} {data.price ? '   •   ' : ''} {data.price}
                </Typography>
                {data.location.display_address.map((info, key) => {
                  if (key === data.location.display_address.length - 1) {
                    return (
                      <Typography level="body2" key={key} sx={{ mb: 2 }}>
                        {info}
                      </Typography>
                    );
                  }
                  else {
                    return (
                      <Typography level="body2" key={key}>
                        {info}
                      </Typography>
                    );
                  }
                }
                )}
                <img
                  src={`/yelp_stars/regular_${data.rating}.png`}
                  alt={data.rating}
                />
                <Typography level="body2">
                  {data.review_count} reviews
                </Typography>
              </div>
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'flex-end' }}>
                <Link
                  overlay
                  underline="none"
                  href={data.url}
                >
                  <img
                    src={`/yelp_logos/yelp_logo_${mode}.png`}
                    alt="Yelp Logo"
                    width="80"
                    height="35"
                  />
                </Link>
              </Box>
            </Box>
          </Card>
        }
      </div>
      }
    </Box>
  )
}