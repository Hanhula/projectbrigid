import React from "react";
import { Text } from "@visx/text";
import { scaleLog } from "@visx/scale";
import Wordcloud from "@visx/wordcloud/lib/Wordcloud";
import { useSelector } from "react-redux";
import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldArticlesByWorld } from "@/components/store/articlesSlice";
import { ParentSize } from "@visx/responsive";

export interface WordData {
  text: string;
  value: number;
}

const colors = ["#BBE7FE", "#D3B5E5", "#FFD4DB", "#EFF1DB"];

function wordFreq(text: string): WordData[] {
  const words: string[] = text.replace(/\./g, "").split(/\s/);
  const freqMap: Record<string, number> = {};

  for (const w of words) {
    if (!freqMap[w]) freqMap[w] = 0;
    freqMap[w] += 1;
  }
  return Object.keys(freqMap).map((word) => ({
    text: word,
    value: freqMap[word],
  }));
}

function getRotationDegree(): number {
  const rand = Math.random();
  const degree = rand > 0.5 ? 60 : -60;
  return rand * degree;
}

interface WordCloudProps {
  words: WordData[];
  width: number;
  height: number;
}

function WordCloud({ words, width, height }: WordCloudProps) {
  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  return (
    <div className="wordcloud-container">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={"Arial"}
        padding={2}
        spiral="archimedean"
        rotate={getRotationDegree}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={"middle"}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}

export default function TagCloud() {
  const world = useSelector(selectWorld);
  const worldArticles = useSelector(selectWorldArticlesByWorld(world.id));
  const articles = worldArticles!.articles;

  // Existing tag list logic
  const tagCountMap: { [key: string]: number } = {};
  articles.forEach((article) => {
    if (article.tags) {
      const tags = article.tags.split(",");
      tags.forEach((tag) => {
        const trimmedTag = tag.trim();
        tagCountMap[trimmedTag] = (tagCountMap[trimmedTag] || 0) + 1;
      });
    }
  });

  const sortedTags = Object.entries(tagCountMap).sort((a, b) => b[1] - a[1]);
  const tagList = sortedTags;

  const tagListText = tagList
    .map(([tag, count]) => `${tag}: ${count}`)
    .join(", ");

  return (
    <div className="wordcloud-and-tags">
      <div className="row">
        <div className="col-md-2">
          <div className="tag-list">
            <h5>Tags Breakdown</h5>
            <dl className="article-tags-list">
              {sortedTags.map(([tag, count]) => (
                <div key={tag} className="article-tags-list-count">
                  <dt>{tag}:</dt>
                  <dd>{count}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="col-md-10">
          <div className="wordcloud">
            <h5>Word Cloud</h5>
            <ParentSize>
              {({ width, height }) => {
                console.log("Width:", width, "Height:", height);
                return (
                  <WordCloud
                    words={wordFreq(tagListText)}
                    width={width}
                    height={height}
                  />
                );
              }}
            </ParentSize>
          </div>
        </div>
      </div>
    </div>
  );
}
