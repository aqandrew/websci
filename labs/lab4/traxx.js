angular.module('traxx', [])
  .controller('TraxxController', TraxxController);

function TraxxController($scope, $http) {
  $scope.appName = 'Traxx';
  $scope.query;
  $scope.tracks;

  $scope.searchSongs = function (event) {
    if ($scope.query) {
      $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search?type=track&q=' + $scope.query.replace(' ', '+') + '&offset=0&limit=10'
      }).then(result => {
        $scope.tracks = result.data.tracks.items;
        console.log(JSON.stringify($scope.tracks, null, 4));
      });
    }
    else {
      $scope.tracks = []
    }
  };

  $scope.getArtistNames = function (artists) {
    return artists.map(a => a.name).join(', ');
  };

  $scope.getAlbumArtUrl = function (album) {
    return album.images[album.images.length - 1].url;
  }
}

TraxxController.$inject = ['$scope', '$http'];
