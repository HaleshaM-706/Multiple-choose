/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from 'react-native';
import { Button } from 'react-native-paper';


const App = () => {
  const [queston, SetQuestion] = useState([])
  const [selectedIndex, SetSelectedIndex] = useState(0)
  const [isShow, SetIsShow] = useState(false)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    let questions = [
      {
        que: 'What is the human being?',
        choose: ['Animals', 'Mamals', 'Repeaties', 'nothing'],
        ans: 0,
        selectedAns: -1
      },
      {
        que: 'What is the Animals being?',
        choose: ['Animals', 'Mamals', 'Repeaties', 'nothing'],
        ans: 2,
        selectedAns: -1
      },
      {
        que: 'What is the vehicals being?',
        choose: ['Animals', 'Mamals', 'Repeaties', 'nothing'],
        ans: 3,
        selectedAns: -1
      }
    ]
    await SetQuestion(questions);
    console.log(questions[0])
  }

  const QuestionSection = (indexValue) => {
    return (
      <View>{
        queston.length != 0 ?
          <View>
            <Text>{indexValue + 1} {queston[indexValue].que}</Text>
            <View>
              <FlatList
                data={queston[indexValue].choose}
                renderItem={({ item, index }) => {
                  return (
                    <View keys={index.toString()}>
                      <Text style={{ margin: 10 }} onPress={selectedAns(index)}>
                        {index + 1 + "."}{item}
                      </Text>
                    </View>
                  )
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          : null
      }
      </View>
    )
  }

  const next = () => {
    if ((queston.length - 1) > selectedIndex) {
      SetSelectedIndex(selectedIndex + 1)
    }
  }

  const previous = () => {
    if (selectedIndex > 0) {
      SetSelectedIndex(selectedIndex - 1)
    }
  }

  const selectedAns = (index) => {
    queston[selectedIndex].selectedAns = index
  }

  const submit = () => {
    SetIsShow(true)
  }

  return (
    <View style={{ margin: 10 }}>
      {!isShow ?
        <View>
          {
            queston.length != 0 ?
              <View>
                {QuestionSection(selectedIndex)}
              </View>
              : null}
          <View style={styles.listPart}>
            <Button mode="contained" onPress={previous}>
              Previous
            </Button>
            <Button mode="contained" onPress={next}>
              Next
            </Button>
          </View>
          <View>
            {
              (selectedIndex == queston.length - 1) ?
                <Button mode="contained" style={{ marginTop: 10 }} onPress={submit}>
                  Submit
                </Button>
                : null
            }

          </View>
        </View>
        :
        <View>{
          queston.length != 0 ?
            queston.map((data, i) => {
              return (
                <View>
                  <Text>{i + 1} {queston[i].que}</Text>
                  <View>
                    <FlatList
                      data={queston[i].choose}
                      renderItem={({ item, index }) => {
                        return (
                          <View keys={index.toString()}>
                            <Text style={{ margin: 5 }} onPress={selectedAns(index)}>
                              {index + 1 + "."}{item}
                            </Text>
                          </View>
                        )
                      }}
                      keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={{ margin: 5 }} >
                          Ans:{data.choose[data.ans]}
                    </Text>
                    <Text style={{ margin: 5 }} >
                          Selected Ans:{data.selectedAns!=-1?data.choose[data.selectedAns]:'Wrong'}
                    </Text>
                  </View>
                </View>
              )
            })
            : null
        }
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  listPart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});

export default App;
