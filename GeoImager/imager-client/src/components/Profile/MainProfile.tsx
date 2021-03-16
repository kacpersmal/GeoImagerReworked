import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import Api from "../../api/Api";
import IGetProfileRequest from "../../api/interfaces/request/IGetProfileRequest";
import IProfileResponse from "../../api/interfaces/response/IProfileResponse";
import "./MainProfile.css";
import Image from "react-bootstrap/Image";
import { Card, Col, Container, Row } from "react-bootstrap";
import Navigation from "../Navbar/Navigation";
type RouteParams = { username: string };
const MainProfile = ({ match }: RouteComponentProps<RouteParams>) => {
  const [profile, setProfile] = useState<IProfileResponse>();
  useEffect(() => {
    const api = new Api();
    const req: IGetProfileRequest = { Username: match.params.username };

    api.getUserProfile(req).then((result) => {
      let data = result.data as IProfileResponse;
      if (!data.userProfileImage) {
        data.userProfileImage = "/images/profile-default.png";
      }
      setProfile(data);
    });
  }, [match.params.username]);

  if (profile === undefined) {
    return <div>404</div>;
  } else {
    return (
      <div>
        <Navigation />
        <Container className="profile-banner ">
          <Container>
            <Row>
              <Col>
                <Image
                  className="profile-image"
                  src={profile.userProfileImage}
                  roundedCircle
                />
              </Col>
              <Col>
                <div className="profile-card">
                  <h4>{profile.username}</h4>
                  <p className="text-muted">
                    {profile.name + " " + profile.surname}
                  </p>
                  <p>{profile.description}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
};

export default MainProfile;
