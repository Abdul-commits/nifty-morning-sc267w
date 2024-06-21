import { useLocation } from "react-router-dom";
import { useState } from "react";

const Planet = () => {
  const location = useLocation();
  const [planetData, setPlanetData] = useState(
    location.state?.planetData || [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  console.log(planetData);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMouseEnter = (index) => {
    setHoveredPlanet(index);
  };

  const handleMouseLeave = () => {
    setHoveredPlanet(null);
  };

  const filteredPlanets = planetData.filter((planet) =>
    planet.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <div>Search for planets</div>
      <div>
        <input
          id="search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {searchTerm && (
        <section>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Population
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPlanets.length > 0 ? (
                filteredPlanets.map((planet, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {planet.name}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        position: "relative",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {"\u{1F468}\u{1F468}\u{1F468}\u{1F468}\u{1F468}"}
                      <span
                        style={{
                          visibility:
                            hoveredPlanet === index ? "visible" : "hidden",
                          width: "120px",
                          backgroundColor: "black",
                          color: "#fff",
                          textAlign: "center",
                          borderRadius: "6px",
                          padding: "5px 0",
                          position: "absolute",
                          zIndex: 1,
                          bottom: "125%", // Position the tooltip above the text
                          left: "50%",
                          marginLeft: "-60px",
                          opacity: hoveredPlanet === index ? 1 : 0,
                          transition: "opacity 0.3s",
                        }}
                      >
                        Population: {planet.population}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{ border: "1px solid black", padding: "8px" }}
                    className="error"
                  >
                    No planet matching search term
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Planet;
