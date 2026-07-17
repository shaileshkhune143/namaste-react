import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import { SWIGGY_RESTAURANT_LIST_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

// const Body = () => {
//   return (
//     <div className="body">
//       <div className="search">Search</div>
//       <div className="res-container">
//         {resList.map((restaurant)=>(<RestaurantCard/>))}
//         <RestaurantCard resData={resList} />
//         <RestaurantCard resName="KFC" cuisine="Burger" />
//       </div>
//     </div>
//   );
// };

const Body = () => {
  //const listOfRestaurants = useState([]); // similar to js variable  const reslist = [];
  const [listOfRestaurants, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteresRestaurant] = useState([]);
  const [error, setError] = useState("");

  const [seachText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(SWIGGY_RESTAURANT_LIST_URL);

      if (!response.ok) {
        throw new Error("Unable to load restaurants.");
      }

      const jsonData = await response.json();
      console.log("json data", jsonData);

      const restaurantCard = jsonData?.data?.cards?.find(
        (card) => card?.card?.card?.gridElements?.infoWithStyle?.restaurants,
      );
      const restaurants =
        restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ??
        [];

      setListOfRestaurant(restaurants);
      setFilteresRestaurant(restaurants);
    } catch (fetchError) {
      setError("Restaurants could not be loaded. Please try again later.");
      console.error(fetchError);
    }
  };

  //consditional renderning
  // if (listOfRestaurants.length === 0) {
  //   return <Shimmer />;
  // }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={seachText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const filteredRestaurants = listOfRestaurants.filter((res) =>
                res?.info?.name
                  ?.toLowerCase()
                  .includes(seachText.trim().toLowerCase()),
              );
              // setListOfRestaurant(filteredRestaurants);
              setFilteresRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            console.log("button clciked");
            const filteredListRes = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4,
            );
            setListOfRestaurant(filteredListRes);
            console.log("lsit os res", filteredListRes);

            //filter logic based on rating
          }}
        >
          Top Rates Restaurants
        </button>
      </div>
      {error && <p>{error}</p>}
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;
