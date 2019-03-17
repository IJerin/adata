// src/reducers/guideReducer.js

import data from '../data/guideList.json';
import images from '../data/images';

// HACK: Get the images from a dynamic source
data.guides.forEach((guide) => {
  const guideImageKey = `${guide.key}`;
  const authorImageKey = `${guide.author.key}`;
  guide.image = images.guides[guideImageKey];
  guide.author.image = images.authors[authorImageKey];

  guide.markers.forEach((marker) => {
    const markerImageKey = `${guideImageKey}_${marker.imageKey}`;
    marker.image = images.image[markerImageKey];
    marker.thumbnailImage = images.thumbnail[markerImageKey];
    marker.gridImage = images.grid[markerImageKey];
  }, this);
}, this);

export default () => data.guides;
