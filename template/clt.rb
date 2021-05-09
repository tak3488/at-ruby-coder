# frozen_string_literal: true

# rubocop:disable Metrics/MethodLength
def copy_code
  text = ''
  flg = false
  File.foreach 'main.rb' do |l|
    l.strip!
    if l == 'def main'
      flg = true
    elsif flg == true && !l.empty?
      text += "#{l}\n"
    end
  end
  IO.popen('pbcopy', 'w') { _1.print(text[0..-5]) }
end
# rubocop:enable Metrics/MethodLength

puts '何をしますか？'
puts ''
puts 'テストを実行: [t]'
puts '貼り付け用コードをコピー(Macのみ): [c]'
puts '終了: [その他のキー]'
print '-> '

case gets.chomp
when 't'
  system('rspec test.rb')
when 'c'
  copy_code
  puts 'コピーしました！'
end
