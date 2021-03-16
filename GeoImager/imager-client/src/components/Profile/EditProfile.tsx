import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Api from "../../api/Api";
import IEditProfileDescriptionRequest from "../../api/interfaces/request/IEditProfileDescriptionRequest";
import IEditProfileImageRequest from "../../api/interfaces/request/IEditProfileImageRequest";
import IGetProfileRequest from "../../api/interfaces/request/IGetProfileRequest";
import IProfileResponse from "../../api/interfaces/response/IProfileResponse";
import PayloadHelper from "../../helpers/PayloadHelper";
import Navigation from "../Navbar/Navigation";
import "./MainProfile.css";
const EditProfile = () => {
  const [profile, setProfile] = useState<IProfileResponse>();
  const [loaded] = useState(false);
  const [fileSelected, setFileSelected] = useState<File>();
  const [newDescription, setNewDescription] = useState("");

  const submitDescription = () => {
    const api = new Api();
    const req: IEditProfileDescriptionRequest = {
      Description: newDescription,
    };
    api.editProfileDescription(req).then((result) => {});
  };

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  const uploadFile = function (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) {
    if (fileSelected) {
      const formData = new FormData();
      formData.append("image", fileSelected, fileSelected.name);
      const request: IEditProfileImageRequest = {
        Data: formData,
      };
      const api = new Api();

      api.editUserProfileImage(request).then((result) => {});
    }
  };

  useEffect(() => {
    const api = new Api();
    const helper = new PayloadHelper();
    const req: IGetProfileRequest = {
      Username: helper.GetPayloadCookie().username,
    };

    api.getUserProfile(req).then((result) => {
      let data = result.data as IProfileResponse;
      setProfile(data);
    });
  }, [loaded]);

  return (
    <div>
      <Navigation />
      <Container className="edit-container">
        {profile && (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                defaultValue={profile.description}
              />
            </Form.Group>

            <Button variant="primary" onClick={submitDescription}>
              Submit
            </Button>
            <Form.Group>
              <input
                accept="image/*"
                id="photo"
                name="photo"
                type="file"
                multiple={false}
                onChange={handleImageChange}
              />
            </Form.Group>
            <Button onClick={uploadFile} variant="primary">
              Upload
            </Button>
          </Form>
        )}
      </Container>
    </div>
  );
};

export default EditProfile;
