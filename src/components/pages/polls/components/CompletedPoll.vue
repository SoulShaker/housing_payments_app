<template>
    <div class="completed-poll-item">
        <div class="question-info">
            <p class="question">{{poll.questionText}}</p>
            <i class="material-icons">info</i>
        </div>
        <div class="answers-statistics">
          <!-- answer 1 -->
          <div class="answer-item">
            <div v-if="poll.answers[0]" class="answer-text">
                {{poll.answers[0].answerText}}
            </div>
            <div class="progress">
                <div v-if="answer1Value > 0" class="line filled" :style="{ width: answer1Value + '%' }">
                    <span>{{answer1Value}} %</span>
                </div>
                <div v-else class="line">
                  <span>0 %</span>
                </div>
            </div>
          </div>

          <!-- answer 2 -->
          <div class="answer-item">
            <div v-if="poll.answers[1]" class="answer-text">
                {{poll.answers[1].answerText}}
            </div>
            <div class="progress">
                <div v-if="answer2Value > 0" class="line filled" :style="{ width: answer2Value + '%' }">
                    <span>{{answer2Value}} %</span>
                </div>
                <div v-else class="line">
                  <span>0 %</span>
                </div>
            </div>
          </div>

          <!-- answer 3 -->
          <div class="answer-item">
            <div v-if="poll.answers[2]" class="answer-text">
                {{poll.answers[2].answerText}}
            </div>
            <div class="progress">
                <div v-if="answer3Value > 0" class="line filled" :style="{ width: answer3Value + '%' }">
                    <span>{{answer3Value}} %</span>
                </div>
                <div v-else class="line">
                  <span>0 %</span>
                </div>
            </div>
          </div>

          <!-- custom -->
          <div class="answer-item">
            <div class="answer-text">
                Другой ответ
            </div>
            <div class="progress">
                <div v-if="customValue > 0" class="line filled" :style="{ width: customValue + '%' }">
                    <span>{{customValue}} %</span>
                </div>
                <div v-else class="line">
                  <span>0 %</span>
                </div>
            </div>
          </div>

        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            answer1Value: 0,
            answer2Value: 0,
            answer3Value: 0,
            customValue: 0
        }
    },
    props: ['poll'],
    created () {
        this.answer1Value = (this.poll.answers[0].answersCount / this.poll.totalAnswersCount) * 100
        this.answer2Value = (this.poll.answers[1].answersCount / this.poll.totalAnswersCount) * 100
        this.answer3Value = (this.poll.answers[2].answersCount / this.poll.totalAnswersCount) * 100
        this.customValue = (this.poll.customAnswersCount / this.poll.totalAnswersCount) * 100
    }
}
</script>

<style lang="less">
.completed-poll-item {
  
  .answer-item {
      padding-bottom: 3px;
  }

  .answer-text {
      color: #3f3f3f;
      padding-top: 3px;
  }

  .progress{
    width: 100%;
    background: #f1f1f1;
    border-radius: 3px;

    .line {
      height: 20px;
      text-align: left;
      color: #3f3f3f;

      &.filled {
        background: #009999;
        text-align: center;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
}
</style>
