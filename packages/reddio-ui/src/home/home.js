import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ListingSummary, { ListingSummarySkeleton } from "./listing-summary";
import Loading from "../lib/loading";
import * as Layout from "../layout";
import * as design from "../design";

const HOME_QUERY = gql`
  query HomeQuery {
    topSubreddits {
      listings {
        pathname
        customInfo {
          description
        }
        posts(limit: 20) {
          name
          title
          thumbnail
        }
      }
    }
  }
`;

function HomeLoading() {
  return (
    <View>
      <Layout.Wide>
        <View style={styles.section}>
          <Text style={styles.sectionTitleText}>Featured Communities</Text>
          <Text style={styles.sectionSubtitleText}>Top subreddits</Text>

          <View style={styles.featuredSummaryList}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ListingSummarySkeleton key={i} />
            ))}
          </View>
        </View>
      </Layout.Wide>

      <Loading />
    </View>
  );
}

function HomeError() {
  return (
    <View>
      <Text>:(</Text>
    </View>
  );
}

class Home extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <Query query={HOME_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return <HomeLoading />;
          }

          if (error) {
            return <HomeError />;
          }

          const topListings = data.topSubreddits.listings || [];
          return (
            <View>
              <Layout.Wide>
                <View style={styles.section}>
                  <Text style={styles.sectionTitleText}>
                    Featured Communities
                  </Text>
                  <Text style={styles.sectionSubtitleText}>Top subreddits</Text>

                  <View style={styles.featuredSummaryList}>
                    {topListings.map(listingInfo => (
                      <ListingSummary
                        key={listingInfo.pathname}
                        pathname={listingInfo.pathname}
                        customInfo={listingInfo.customInfo}
                        posts={listingInfo.posts}
                      />
                    ))}
                  </View>
                </View>
              </Layout.Wide>

              <View style={styles.explore}>
                <Text style={styles.exploreTitle}>
                  Explore more music communities
                </Text>
                <Button
                  title="Explore"
                  color={design.colors.primary.c5}
                  onPress={() => history.push("/explore")}
                />
              </View>
            </View>
          );
        }}
      </Query>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    display: "flex",
    alignItems: "center",
    paddingTop: design.spacing.larger2,
    paddingBottom: design.spacing.larger2
  },
  sectionTitleText: {
    fontSize: design.fontSize.larger1,
    marginBottom: design.spacing.small,
    color: design.colors.neutral.c3
  },
  sectionSubtitleText: {
    fontSize: design.fontSize.base,
    marginBottom: design.spacing.large,
    color: design.colors.neutral.c6
  },
  featuredSummaryList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  explore: {
    display: "flex",
    alignItems: "center",
    backgroundColor: design.colors.neutral.c4,
    padding: design.spacing.larger2
  },
  exploreTitle: {
    fontSize: design.fontSize.large,
    marginBottom: design.spacing.small,
    color: design.colors.neutral.c10
  }
});

export default withRouter(Home);
