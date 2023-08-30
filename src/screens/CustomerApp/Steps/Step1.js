import React, { Fragment } from "react";
import { FormGroup, Label, Input } from "reactstrap";

export default class WizardStep1 extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="form-wizard-content">
          <h3 className="form-heading pt-3 pb-3">
            Kişisel bilgiler
            <p>Aşağıdaki formu doldurduktan sonra devam tuşuna basınız.</p>
          </h3>
          <FormGroup dir="">
            <Label for="username">İsim </Label>
            <Input
              type="username"
              name="username"
              id="username"
              placeholder="İsminiz"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail55">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail55"
              placeholder="Email adresiniz"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress">telefon</Label>
            <Input
              type="text"
              name="address"
              id="exampleAddress"
              placeholder="+90532.."
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelect">Ülke seçimi</Label>
            <Input type="select" id="exampleCustomSelect" name="customSelect">
              <option value="">Ülke seç</option>
              <option>Almanya</option>
              <option>İspanya</option>
              <option>Kanada</option>
              <option>Yunanistan</option>
              <option>İtalya</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelect">Vize tipi</Label>
            <Input type="select" id="exampleCustomSelect" name="customSelect">
              <option value="">Vize tipi seç</option>
              <option>Turistik</option>
              <option>İş</option>
            </Input>
          </FormGroup>
        </div>
      </Fragment>
    );
  }
}
