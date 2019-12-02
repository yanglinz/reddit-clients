import React from "./node_modules/react";
import ReactPlayer from "./node_modules/react-player";
import { connect } from "./node_modules/react-redux";
import noop from "./node_modules/lodash/noop";

import PlayerControls from "./Controls";
import * as playerStore from "./store";

function mapStateToProps(state) {
  return {
    status: state.player.status,
    iframePlaying: state.player.iframePlaying,
    activePost: playerStore.selectActivePost(state)
  };
}

function AppPlayer(props) {
  const { dispatch, status, iframePlaying, activePost } = props;
  const { iframeEvents } = playerStore;

  return (
    <div className="AppPlayer">
      <div
        style={{
          zIndex: 2,
          position: "fixed",
          bottom: 90,
          right: 20
        }}
      >
        {activePost ? (
          <ReactPlayer
            width={350}
            height={165}
            url={activePost.url}
            controls
            playing={iframePlaying}
            onReady={() =>
              dispatch(playerStore.iframeAction(iframeEvents.READY))
            }
            onStart={() =>
              dispatch(playerStore.iframeAction(iframeEvents.START))
            }
            onPlay={() => dispatch(playerStore.iframeAction(iframeEvents.PLAY))}
            onPause={() =>
              dispatch(playerStore.iframeAction(iframeEvents.PAUSE))
            }
            onEnded={() =>
              dispatch(playerStore.iframeAction(iframeEvents.ENDED))
            }
            onError={() =>
              dispatch(playerStore.iframeAction(iframeEvents.ERROR))
            }
            onProgress={noop}
            onDuration={noop}
            onBuffer={noop}
            onSeek={noop}
          />
        ) : null}
      </div>

      <div
        style={{
          zIndex: 2,
          position: "fixed",
          bottom: 0,
          width: "100%",
          background: "#fff"
        }}
      >
        <PlayerControls
          status={status}
          activePost={activePost}
          handlePrev={() => dispatch(playerStore.controlPrev())}
          handlePlay={() => dispatch(playerStore.controlPlay())}
          handlePause={() => dispatch(playerStore.controlPause())}
          handleSkip={() => dispatch(playerStore.controlSkip())}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(AppPlayer);
