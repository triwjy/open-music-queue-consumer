const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongs(playlistId) {
    const query = {
      text: `SELECT songs.title, songs.year, songs.performer, 
      songs.genre, songs.duration
      FROM playlistsongs as pl
      INNER JOIN songs
      ON pl.song_id = songs.id
      WHERE pl.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistsService;
