import { useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs, Button } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";
import Logo7 from "assets/Logo7.svg";
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Mochiy Pop One, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "50px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Mochiy Pop One, sans-serif",
    padding: "60px 130px 31px 100px",
    boxShadow: "0 10px 50px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const contractProcessor = useWeb3ExecuteFunction();
  const { Moralis } = useMoralis();

  async function donateETH(value) {
    let options = {
      contractAddress: "0x796B064B4Be131630057f1350f174ff563933431",
      functionName: "newDonation",
      abi: [
        {
          // eslint-disable-next-line prettier/prettier
          "inputs": [{ "internalType" : "string", "name" : "note", "type" : "string" }],
          // eslint-disable-next-line prettier/prettier
          "name": "newDonation",
          // eslint-disable-next-line prettier/prettier
          "outputs" : [],
          // eslint-disable-next-line prettier/prettier
          "stateMutability" : "payable",
          // eslint-disable-next-line prettier/prettier
          "type" : "function",
        },
      ],
      params: {
        note: "Thank you for your donation",
      },
      msgValue: Moralis.Units.ETH(value),
    };
    await contractProcessor.fetch({
      params: options,
    });
  }

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <TokenPrice
              address="0x930C8c3059bBB9e7351EAC931a1A0E62b7Bb6115"
              chain="bsc"
              image="https://yumpie.app/static/media/logo2.de962c62.svg"
              size="60px"
            />
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/swap">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Avalanche</span>} key="4">
                  <DEX chain="avax" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/swap" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/swap" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          🐱‍👓⭐️🐱‍🏍 Donate ETH to{" "}
          <a
            href="https://www.yostudent.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Yo! Student
          </a>
          .<br /> Thank you for your support!
        </Text>
        <br />
        <Text style={{ display: "block" }}>
          <Button onClick={() => donateETH(0.005)}>0.005 ETH</Button>
          <Button onClick={() => donateETH(0.01)}>0.01 ETH</Button>
          <Button onClick={() => donateETH(0.025)}>0.025 ETH</Button>
          <Button onClick={() => donateETH(0.05)}>0.05 ETH</Button>
          <Button onClick={() => donateETH(0.1)}>0.1 ETH</Button>
          <Button onClick={() => donateETH(0.25)}>0.25 ETH</Button>
          <Button onClick={() => donateETH(0.5)}>0.5 ETH</Button>
          <Button onClick={() => donateETH(1)}>1 ETH</Button>
        </Text>
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div
    style={{
      display: "flex",
      width: "28%",
      marginBottom: "15px",
    }}
  >
    <img src={Logo7} alt="" />
  </div>
);

export default App;
