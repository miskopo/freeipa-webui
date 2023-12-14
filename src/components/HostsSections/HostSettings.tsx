import React, { useState } from "react";
// PatternFly
import {
  Flex,
  FlexItem,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";
// Data types
import { Host, Metadata } from "../../utils/datatypes/globalDataTypes";
// Forms
import IpaTextArea from "../Form/IpaTextArea";
import IpaTextInput from "../Form/IpaTextInput";
import IpaCheckbox from "../Form/IpaCheckbox";
import IpaCheckboxes from "../Form/IpaCheckboxes";
import IpaSshPublicKeys from "../Form/IpaSshPublicKeys";
import IpaTextboxList from "../Form/IpaTextboxList";

// Layouts
import PopoverWithIconLayout from "../layouts/PopoverWithIconLayout";
// Modals
import PrincipalAliasMultiTextBox from "../Form/PrincipalAliasMultiTextBox";
// Utils
import { asRecord } from "../../utils/hostUtils";
// Hooks
import useUpdateRoute from "src/hooks/useUpdateRoute";

interface PrincipalAlias {
  id: number | string;
  alias: string;
}

interface PropsToHostSettings {
  host: Partial<Host>;
  metadata: Metadata;
  onHostChange: (host: Partial<Host>) => void;
  onRefresh: () => void;
}

const HostSettings = (props: PropsToHostSettings) => {
  // Host name - textbox (mandatory field)
  const [hostName] = useState(props.host.fqdn);

  // Principal alias - textbox
  const [principalAliasList, setPrincipalAliasList] = useState<
    PrincipalAlias[]
  >([
    {
      id: 0,
      alias: "host/" + props.host.fqdn + REALM, // TODO: The realm (@SERVER.IPA.DEMO) should adapt to context
    },
  ]);

  // Description - textbox
  const [hostDescription, setHostDescription] = useState(
    props.host.description
  );
  const onChangeDescriptionHandler = (newDescription: string) => {
    setHostDescription(newDescription);
  };

  // Class - textbox
  const [hostClass, setHostClass] = useState(props.host.userclass);
  const updateHostClass = (newHostClass: string) => {
    setHostClass(newHostClass);
  };

  // Locality - textbox
  const [locality, setLocality] = useState("");
  const updateLocality = (newLocality: string) => {
    setLocality(newLocality);
  };
  const [location, setLocation] = useState("");
  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
  };
  const [platform, setPlatform] = useState("");
  const updatePlatform = (newPlatform: string) => {
    setPlatform(newPlatform);
  };
  const [operatingSystem, setOperatingSystem] = useState("");
  const updateOperatingSystem = (newOperatingSystem: string) => {
    setOperatingSystem(newOperatingSystem);
  };

  // SSH public keys
  const [sshPublicKeys] = useState<SshPublicKey[]>([]);

  // MAC address
  const [macAddressList, setMacAddressList] = useState<MacAddress[]>([]);

  // - 'Add MAC address' handler
  const onAddMacAddressFieldHandler = () => {
    const macAddressListCopy = [...macAddressList];
    macAddressListCopy.push({
      id: Date.now.toString(),
      address: "",
    });
  }

  // Get 'ipaObject' and 'recordOnChange' to use in 'IpaTextInput'
  const { ipaObject, recordOnChange } = asRecord(
    props.host,
    props.onHostChange
  );

  const AuthIndicatorsTypesMessage = () => (
    <div>
      <p>
        Defines an allow list for Authentication indicators. Use <b>otp</b> to
        allow OTP-based 2FA authentications. Use <b>radius</b> to allow
        RADIUS-based 2FA authentications. Use <b>pkinit</b> to allow
        PKINIT-based 2FA authentications. Use <b>hardened</b> to allow
        brute-force hardened password authentication by SPAKE or FAST. With{" "}
        <b>no indicator</b> specified, all authentication mechanisms are
        allowed.
      </p>
    </div>
  );

  // Assigned ID view - data type unknown, treated as string from now
  const [assignedIDView] = useState("");

  // MAC Address validator
  const validateMAC = (value: string) => {
    const mac_regex = /^([a-fA-F0-9]{2}[:|\\-]?){5}[a-fA-F0-9]{2}$/;
    return value.match(mac_regex) !== null ? true : false;
  };

  return (
    <>
      <Flex direction={{ default: "column", lg: "row" }}>
        <FlexItem flex={{ default: "flex_1" }}>
          <Form className="pf-v5-u-mb-lg">
            <FormGroup label="Host name" fieldId="host-name">
              <TextInput
                id="host-name"
                name="hostname"
                value={hostName}
                type="text"
                aria-label="host name"
                isDisabled
              />
            </FormGroup>
            <FormGroup label="Principal alias" fieldId="principal-alias">
              {principalAliasList.map((alias, idx) => (
                <Flex key={idx} className={idx !== 0 ? "pf-v5-u-mt-sm" : ""}>
                  <FlexItem>{alias.alias}</FlexItem>
                  <FlexItem>
                    <SecondaryButton
                      onClickHandler={() => openModalAndSetAlias(alias.alias)}
                    >
                      Delete
                    </SecondaryButton>
                  </FlexItem>
                </Flex>
              ))}
            </FormGroup>
            <FormGroup label="Description" fieldId="description">
              <IpaTextArea
                name="description"
                onChange={(_event, newDescription: string) =>
                  onChangeDescriptionHandler(newDescription)
                }
                aria-label="host description"
                resizeOrientation="vertical"
              />
            </FormGroup>
            <FormGroup label="Class" fieldId="host-class">
              <TextInput
                id="host-class"
                name="userclass"
                onChange={(_event, newHostClass: string) =>
                  updateHostClass(newHostClass)
                }
                value={hostClass}
                type="text"
                aria-label="host class"
              />
            </FormGroup>
            <FormGroup label="Locality" fieldId="locality">
              <TextInput
                id="locality"
                name="l"
                onChange={(_event, newLocality: string) =>
                  updateLocality(newLocality)
                }
                value={locality}
                type="text"
                aria-label="locality"
              />
            </FormGroup>
            <FormGroup label="Location" fieldId="location">
              <TextInput
                id="location"
                name="nshostlocation"
                onChange={(_event, newLocation: string) =>
                  updateLocation(newLocation)
                }
                value={location}
                type="text"
                aria-label="location"
              />
            </FormGroup>
            <FormGroup label="Platform" fieldId="platform">
              <TextInput
                id="platform"
                name="nshardwareplatform"
                onChange={(_event, newPlatform: string) =>
                  updatePlatform(newPlatform)
                }
                value={platform}
                type="text"
                aria-label="platform"
              />
            </FormGroup>
            <FormGroup label="Operating system" fieldId="operating-system">
              <TextInput
                id="operating-system"
                name="nsosversion"
                onChange={(_event, newOperatingSystem: string) =>
                  updateOperatingSystem(newOperatingSystem)
                }
                value={operatingSystem}
                type="text"
                aria-label="operating-system"
              />
            </FormGroup>
          </Form>
        </FlexItem>
        <FlexItem flex={{ default: "flex_1" }}>
          <Form>
            <FormGroup label="SSH public keys" fieldId="ipasshpubkey">
              <IpaSshPublicKeys
                ipaObject={ipaObject}
                onChange={recordOnChange}
                metadata={props.metadata}
                onRefresh={props.onRefresh}
                from={"hosts"}
              />
            </FormGroup>
            <FormGroup label="MAC address" fieldId="mac-address">
              <Flex direction={{ default: "column" }} name="macaddress">
                {macAddressList.map((macAddress, idx) => (
                  <Flex
                    direction={{ default: "row" }}
                    key={macAddress.id + "-" + idx + "-div"}
                    name={"macaddress-" + idx}
                  >
                    <FlexItem
                      key={macAddress.id + "-textbox"}
                      flex={{ default: "flex_1" }}
                    >
                      <TextInput
                        id="mac-address-text"
                        value={macAddress.address}
                        type="text"
                        name={"macaddress-" + idx}
                        aria-label="mac address"
                        onChange={(event, value) =>
                          onHandleMacAddressChange(value, event, idx)
                        }
                      />
                    </FlexItem>
                    <FlexItem key={macAddress.id + "-delete-button"}>
                      <SecondaryButton
                        name="remove"
                        onClickHandler={() => onRemoveMacAddressHandler(idx)}
                      >
                        Delete
                      </SecondaryButton>
                    </FlexItem>
                  </Flex>
                ))}
              </Flex>
              <SecondaryButton
                classname={macAddressList.length !== 0 ? "pf-v5-u-mt-md" : ""}
                name="add"
                onClickHandler={onAddMacAddressFieldHandler}
              >
                Add
              </SecondaryButton>
            </FormGroup>
            <FormGroup
              label="Authentication indicators"
              fieldId="krbprincipalauthind"
              labelIcon={
                <PopoverWithIconLayout message={AuthIndicatorsTypesMessage} />
              }
            >
              <Checkbox
                label="Two-factor authentication (password + OTP)"
                isChecked={tpaCheckbox}
                aria-label="two factor authentication from authentication indicators checkbox"
                id="tpaCheckbox"
                name="ipauserauthtype"
                value="otp"
                className="pf-v5-u-mt-xs pf-v5-u-mb-sm"
              />
              <Checkbox
                label="RADIUS"
                isChecked={radiusCheckbox}
                aria-label="radius from authentication indicators checkbox"
                id="radiusCheckbox"
                name="ipauserauthtype"
                value="radius"
                className="pf-v5-u-mt-xs pf-v5-u-mb-sm"
              />
              <Checkbox
                label="PKINIT"
                isChecked={pkinitCheckbox}
                aria-label="pkinit from authentication indicators checkbox"
                id="pkinitCheckbox"
                name="ipauserauthtype"
                value="pkinit"
                className="pf-v5-u-mt-xs pf-v5-u-mb-sm"
              />
              <Checkbox
                label="Hardened password (by SPAKE or FAST)"
                isChecked={hardenedPassCheckbox}
                aria-label="hardened password from authentication indicators checkbox"
                id="hardenedPassCheckbox"
                name="ipauserauthtype"
                value="hardened"
              />
            </FormGroup>
            <FormGroup
              label="Trusted for delegation"
              fieldId="trusted-delegation"
            >
              <IpaCheckbox
                name="ipakrbokasdelegate"
                value="trustedForDelegation"
                text="Trusted for delegation"
                ipaObject={ipaObject}
                onChange={recordOnChange}
                objectName="host"
                metadata={props.metadata}
              />
            </FormGroup>
            <FormGroup
              label="Trusted to authenticate as a user"
              fieldId="trusted-auth-as-user"
            >
              <IpaCheckbox
                name="ipakrboktoauthasdelegate"
                value="trustedAuthAsUser"
                text="Trusted to authenticate as a user"
                ipaObject={ipaObject}
                onChange={recordOnChange}
                objectName="host"
                metadata={props.metadata}
              />
            </FormGroup>
            <FormGroup label="Assigned ID view" fieldId="assigned-id-view">
              <TextInput
                id="assigned-id-view"
                name="ipaassignedidview"
                value={assignedIDView}
                type="text"
                aria-label="assigned id view"
                isDisabled
              />
            </FormGroup>
          </Form>
        </FlexItem>
      </Flex>
    </>
  );
};

export default HostSettings;
