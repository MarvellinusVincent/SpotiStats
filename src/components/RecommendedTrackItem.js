import React from 'react';
import PropTypes from 'prop-types';
import { formatDuration } from '../utils';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { Theme, Mixins, Media } from '../styles';
import { PlusIcon, PlayIcon } from '../assets';

const { colors, fontSizes, spacing } = Theme;

const TrackLeft = styled.span`
  ${Mixins.overflowEllipsis};
`;

const TrackRight = styled.span`
  display: flex;
  align-items: center;
`;

const TrackPicture = styled.div`
  display: inline-block;
  position: relative;
  width: 60px;
  min-width: 60px;
  margin-right: ${spacing.base};
`;

const PlayButton = styled.div`
  ${Mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const AlbumImage = styled.img`
  border-radius: 8px;
`;

const Cover = styled.div`
  ${Mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: ${colors.white};
  opacity: 0;
  transition: ${Theme.transition};
`;

const TrackContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding-top: 4px;
  padding-bottom: 4px;
  ${Media.tablet`
    margin-bottom: ${spacing.base};
  `};
  &:hover,
  &:focus {
    ${Cover} {
      opacity: 1;
    }
    ${PlayButton} {
      opacity: 1;
    }
    background-color: #2a2a2a;
  }
`;

const TrackMiniContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
    text-decoration: none; /* Prevent default link underline */
  }
`;

const TrackAlbum = styled.div`
  ${Mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`;

const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;

const PlusIconImg = styled.img`
  width: 18px;
  margin-right: 10px;
  visibility: hidden;
`;

const RecommendedTrackItem = ({ track, onAddToPlaylist }) => (
  <li>
    <TrackContainer>
      <TrackPicture>
        {track.album.images.length && (
          <>
            <AlbumImage src={track.album.images[2].url} alt="Album Artwork" />
            <PlayButton>
              <PlayIcon />
            </PlayButton>
          </>
        )}
      </TrackPicture>
      <TrackMiniContainer>
        <TrackLeft>
          {track.name && (
            <TrackName as={Link} to={`/track/${track.id}`}>
              {track.name}
            </TrackName>
          )}
          {track.artists && track.album && (
            <TrackAlbum>
              {track.artists &&
                track.artists.map(({ name }, i) => (
                  <span key={i}>
                    {name}
                    {i !== track.artists.length - 1 && ', '}
                  </span>
                ))}
            </TrackAlbum>
          )}
        </TrackLeft>
        <TrackRight>
          <a>
            <PlusIconImg
              className="plus-icon"
              src={PlusIcon}
              alt="Plus Icon"
              onClick={() => onAddToPlaylist(track.id)}
            />
          </a>
          {track.duration_ms && <TrackDuration>{formatDuration(track.duration_ms)}</TrackDuration>}
        </TrackRight>
      </TrackMiniContainer>
    </TrackContainer>
  </li>
);

RecommendedTrackItem.propTypes = {
  track: PropTypes.object.isRequired,
  onAddToPlaylist: PropTypes.func.isRequired,
};

export default RecommendedTrackItem;