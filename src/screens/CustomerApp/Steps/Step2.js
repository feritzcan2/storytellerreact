import { Divider } from "@mui/material";
import React, { Fragment } from "react";
import { FormGroup, Label, Input, Button } from "reactstrap";
import { UploadOutlined } from "@ant-design/icons";
import { Button as UploadButton, message, Upload } from "antd";
export default class WizardStep2 extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="form-wizard-content">
          <h3 className="form-heading pt-3 pb-3">
            Gerekli dosyalar ve belgeler.
            <p>
              Başvurunuzu tamamlamak için ihtiyacınız olacak tüm dosyalar bu
              sayfada listelenmiştir.
            </p>
            <p>
              Lütfen aşağıdaki formu kullanarak gerekli belgeleri sistemimize
              yükleyin.
            </p>
            <p>
              Yüklediğiniz belgeler, tarafımızdan kontrol edilip onaylanacaktır.
            </p>
          </h3>
          <FormGroup>
            <Divider className="mb-5 mt-3" />

            <FormGroup
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                style={{ fontSize: "0.9rem", width: "100%" }}
                className="mb-4 me-2"
                color="primary"
              >
                Şengen vize başvuru formu
                <span className="badge bg-light"> INDIR</span>
              </Button>
              <p className="mt-2">
                Vize başvuru formunu indirip doldurduktan sonra lütfen dosyayı
                seçin.
              </p>
              <Upload>
                <UploadButton icon={<UploadOutlined />}>
                  Doldurduğun formu yüklemek için tıkla
                </UploadButton>
              </Upload>
            </FormGroup>
            <Divider className="mb-2 mt-5" />

            <FormGroup
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                style={{ fontSize: "0.9rem", width: "100%" }}
                className="mb-4 me-2"
                color="primary"
              >
                Ulaşım, Konaklama biletleri
                <span className="badge bg-light"> BİLGİ AL </span>
              </Button>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p className="mt-2">Uçak rezervasyonu:</p>
                <Upload>
                  <UploadButton icon={<UploadOutlined />}>
                    Yüklemek için tıkla
                  </UploadButton>
                </Upload>
              </div>
            </FormGroup>

            <FormGroup
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                style={{ fontSize: "0.9rem", width: "100%" }}
                className="mb-4 me-2"
                color="primary"
              >
                E-Devletten alınacak belgeler
                <span className="badge bg-light"> BİLGİ AL </span>
              </Button>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p className="mt-2">Uçak rezervasyonu:</p>
                <Upload>
                  <UploadButton icon={<UploadOutlined />}>
                    Yüklemek için tıkla
                  </UploadButton>
                </Upload>
              </div>
            </FormGroup>
            <FormGroup
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="mt-2">Otel Rezervasyonu:</p>
              <Upload>
                <UploadButton icon={<UploadOutlined />}>
                  Yüklemek için tıkla
                </UploadButton>
              </Upload>
            </FormGroup>
            <Divider className="mb-5 mt-3" />
            <FormGroup check>
              <Input id="checkbox2" type="checkbox" />{" "}
              <Label check>Or this one</Label>
            </FormGroup>
            <FormGroup check>
              <Input id="checkbox2" type="checkbox" disabled />{" "}
              <Label check>But not this disabled one</Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Radios</Label>
            <FormGroup check>
              <Input name="radio2" type="radio" />{" "}
              <Label check>Select this custom radio</Label>
            </FormGroup>
            <FormGroup check>
              <Input name="radio2" type="radio" />{" "}
              <Label check>Or this one</Label>
            </FormGroup>
            <FormGroup check disabled>
              <Input disabled name="radio2" type="radio" />{" "}
              <Label check>But not this disabled one</Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Inline</Label>
            <div>
              <FormGroup check inline>
                <Input type="checkbox" />
                <Label check>An inline custom input</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input type="checkbox" />
                <Label check>and another one</Label>
              </FormGroup>
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelect">Custom Select</Label>
            <Input type="select" id="exampleCustomSelect" name="customSelect">
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomMutlipleSelect">
              Custom Multiple Select
            </Label>
            <Input
              type="select"
              id="exampleCustomMutlipleSelect"
              name="customSelect"
              multiple
            >
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelectDisabled">
              Custom Select Disabled
            </Label>
            <Input
              type="select"
              id="exampleCustomSelectDisabled"
              name="customSelect"
              disabled
            >
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomMutlipleSelectDisabled">
              Custom Multiple Select Disabled
            </Label>
            <Input
              type="select"
              id="exampleCustomMutlipleSelectDisabled"
              name="customSelect"
              multiple
              disabled
            >
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">File Browser</Label>
            <Input
              type="file"
              id="exampleCustomFileBrowser"
              name="customFile"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">
              File Browser with Custom Label
            </Label>
            <Input
              type="file"
              id="exampleCustomFileBrowser"
              name="customFile"
              label="Yo, pick a file!"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">File Browser Disabled</Label>
            <Input
              type="file"
              id="exampleCustomFileBrowser"
              name="customFile"
              disabled
            />
          </FormGroup>
        </div>
      </Fragment>
    );
  }
}
