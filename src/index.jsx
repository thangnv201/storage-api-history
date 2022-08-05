import ForgeUI, { render, Text, Fragment, GlobalPage, Form, TextField, useState, useProductContext, Table, Head, Row, Cell, User } from '@forge/ui';
import { storage } from '@forge/api';
const App = () => {

  const context = useProductContext();
  const [history_log,setHistory_log] = useState(async () => await storage.get("history"));

  const onSubmit = async (formData) => {
    let log = {
      accountid: context.accountId,
      key: formData.key,
      value: formData.value,
      timeZone: new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    }
    storage.set(formData.key, formData.value);
    if (history_log === undefined) {
      let newHistorylog = [];
      newHistorylog.push(log);
      storage.set("history", newHistorylog);
      setHistory_log(newHistorylog)
    }
    else {
      history_log.push(log);
      storage.set("history", history_log);
      setHistory_log(history_log)
    }
  };

  return (
    <Fragment>
      <Form onSubmit={onSubmit}>
        <TextField name="key" label="key" />
        <TextField name="value" label="value" />
      </Form>
      <Table>
        <Head>
          <Cell><Text>User</Text></Cell>
          <Cell><Text>Key</Text></Cell>
          <Cell><Text>Value</Text></Cell>
          <Cell><Text>Time</Text></Cell>

        </Head>
       
        { history_log!==undefined && history_log.reverse().map(log =>(
          <Row>
            <Cell>
              <User accountId={log.accountid}></User>
            </Cell>
            <Cell>
              <Text>{log.key}</Text>
            </Cell>
            <Cell>
              <Text>{log.value}</Text>
            </Cell>
            <Cell>
              <Text>{log.timeZone}</Text>
            </Cell>
          </Row>
        ))}
      </Table>

    </Fragment>
  );
};



export const run = render(
  <GlobalPage>
    <App />
  </GlobalPage>
);