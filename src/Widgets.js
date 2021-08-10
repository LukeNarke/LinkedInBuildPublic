import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  // a function that returns JSX
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widgets__articleLeft">
        <FiberManualRecordIcon />
      </div>

      <div className="widgets__articleRight">
        {/* shows the heading and subtitle that were passed in as arguments */}
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>
      {/* newsArticle function that we created above to create these news articles */}
      {newsArticle("Luke Narke has arrived", "Top News -- 100 offers")}
      {newsArticle("Bitcoin hits new highs", "Top News -- 10,000 readers")}
      {newsArticle("Thaialnd open for tourism", "Top News -- 824 readers")}
      {newsArticle("Best Holiday Spots", "Top News -- 456 readers")}
    </div>
  );
}

export default Widgets;
