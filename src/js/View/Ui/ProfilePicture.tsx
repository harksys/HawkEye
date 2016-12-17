import * as React from 'react';

interface IProfilePictureProps
{
  picture: string;
};

const ProfilePicture: React.SFC<IProfilePictureProps> = ({ picture }) =>
(
  <img src={picture}
       className="profile-picture img-scale" />
);

export default ProfilePicture;