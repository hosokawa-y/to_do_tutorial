import { Ref, isRef, ref, computed } from 'vue'

// useFormatDate関数はリアクティブな要素とそうでない要素どちらも受け取る
export const useFormatDate = (date: Date | Ref<Date>) => {
  // 受け取った要素がリアクティブかどうかはisRef()で判断する。
  // リアクティブじゃなかったらref()でリアクティブ化してから使用する。ref()は値をオブジェクト化する
  const dateRef = isRef(date) ? date : ref(date)
  // computed関数は、中で利用されているリアクティブな値が更新されたときのみ計算結果が再評価される
  return computed(() => {
    // ref()でリアクティブ化した値にアクセスするにはdeteRef.valueのようにアクセスする
    return `${dateRef.value.getFullYear()}/${
      dateRef.value.getMonth() + 1
    }/${dateRef.value.getDate()}`
  })
}