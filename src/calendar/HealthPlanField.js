import React from "react";
import { Form } from "semantic-ui-react";
import { FirestoreDocument } from "react-firestore";
import FirestorePath from "shared/FirestorePath";

const HealthPlanField = ({
  selectedCustomer,
  selectedHealthPlan = "",
  onChange
}) => {
  //If selectedCustomerId is empty, we render a disabled Input.
  const disabledHealthPlan = (
    <Form.Input
    name="healtPlan"
    label="Plano de saúde"
    disabled
    placeholder="Escolha o Cliente"
  />

  );
  if (!selectedCustomer) {
    return disabledHealthPlan;
  }

  return (
    <FirestorePath
      path={`Customers/${selectedCustomer.id}`}
      render={fullCustomerPath => (
        <FirestoreDocument
          path={fullCustomerPath}
          render={({ isLoading, data: customer }) => {
            if (isLoading) {
              return disabledHealthPlan;
            }
            //if customer has a healthPlan, we add it as an option to the dropbox
            let options = [
              {
                key: "particular",
                value: "particular",
                text: "Particular"
              }
            ];
            if (!customer.healthPlanId) {
              return (
                <HealthPlanField.Dropdown
                  options={options}
                  onChange={onChange}
                  selectedHealthPlan={selectedHealthPlan}
                />
              );
            }

            return (
              <FirestorePath
                path={`HealthPlans/${customer.healthPlanId}`}
                render={fullHealthPath => (
                  <FirestoreDocument
                    path={fullHealthPath}
                    render={({ isLoading, data: healthPlan }) => {
                      if (isLoading) {
                        return disabledHealthPlan;
                      }

                      options.unshift({
                        key: healthPlan.id,
                        value: healthPlan.name,
                        text: healthPlan.name
                      });

                      return (
                        <HealthPlanField.Dropdown
                          options={options}
                          onChange={onChange}
                          selectedHealthPlan={selectedHealthPlan}
                        />
                      );
                    }}
                  />
                )}
              />
            );
          }}
        />
      )}
    />
  );
};

HealthPlanField.Dropdown = ({ options, selectedHealthPlan = "", onChange }) => (
  <Form.Dropdown
    label="Plano de saúde"
    name="healthPlan"
    placeholder="Selecionar Plano"
    value={selectedHealthPlan}
    fluid
    search
    selection
    onChange={onChange}
    options={options}
  />
);

export default HealthPlanField;
