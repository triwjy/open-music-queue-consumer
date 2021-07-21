/* eslint-disable max-len */
class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const notes = await this._playlistsService.getSongs(playlistId);
      const playlistName = await this._playlistsService.getPlaylistName(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, playlistName, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
